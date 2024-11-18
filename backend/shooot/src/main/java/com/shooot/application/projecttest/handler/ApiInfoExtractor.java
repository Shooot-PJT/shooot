package com.shooot.application.projecttest.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.lang.reflect.Type;
import java.util.*;

public final class ApiInfoExtractor {

    public static List<ApiInfoDto> extractApiInfo(Map<String, List<Class<?>>> stringListMap) throws Exception {
        List<Class<?>> classes = stringListMap.get(CustomClassLoader.WRTIE_CLASSES);
        List<ApiInfoDto> endPoints = new ArrayList<>();

        for (Class<?> clazz : classes) {
            boolean isController = clazz.isAnnotationPresent(Controller.class);
            boolean isRestController = clazz.isAnnotationPresent(RestController.class) || (isController && clazz.isAnnotationPresent(ResponseBody.class));
            String prefix = null;

            Annotation annotation = clazz.getAnnotation(RequestMapping.class);

            if (annotation != null) {
                prefix = String.join(", ", getPathsFromAnnotation(annotation));
            }

            if(prefix == null) {
                prefix = "";
            }

            if (isRestController || isController) {

                for (Method method : clazz.getDeclaredMethods()) {
                    if (isRestController || method.isAnnotationPresent(ResponseBody.class)) {
                        extractEndpointInfo(method, endPoints, prefix);
                        extractReturnTypeInfo(method);

                        for (Parameter parameter : method.getParameters()) {
                            if (shouldSkipParameter(parameter)) {
                                continue;
                            }
                            extractParameterInfo(parameter);
                        }
                    }
                }
            }

        }
        return endPoints;
    }

    private static void extractEndpointInfo(Method method, List<ApiInfoDto> urls, String prefix) {
        Class<? extends Annotation>[] httpAnnotations = new Class[]{
                RequestMapping.class, GetMapping.class, PostMapping.class, PutMapping.class, DeleteMapping.class, PatchMapping.class
        };

        for (Class<? extends Annotation> annotationClass : httpAnnotations) {
            Annotation annotation = method.getAnnotation(annotationClass);
            if (annotation != null) {

                String[] paths = getPathsFromAnnotation(annotation);
                String path = prefix + String.join(", ", paths);
                System.out.println("API Endpoint: " + path + " - Method: " + method.getName());
                RequestMethod[] methods = getRequestMethodsFromAnnotation(annotation);
                Arrays.stream(methods).forEach(requestMethod -> {
                    ApiInfoDto dto = new ApiInfoDto(path, requestMethod.name());
                    urls.add(dto);
                });
            }
        }
    }

    private static void extractReturnTypeInfo(Method method) {
        Type returnType = method.getGenericReturnType();

        if (returnType instanceof Class<?> && ResponseEntity.class.isAssignableFrom((Class<?>) returnType)) {
            Type responseEntityType = ((Class<?>) returnType).getGenericSuperclass();
            System.out.println("Return Type: ResponseEntity<" + responseEntityType + ">");
        } else {
            System.out.println("Return Type: " + returnType.getTypeName());
        }
    }

    private static void extractParameterInfo(Parameter parameter) throws JsonProcessingException {
        if (parameter.isAnnotationPresent(PathVariable.class)) {
            System.out.println("PathVariable: " + parameter.getName() + " - Type: " + parameter.getType().getSimpleName());
        } else if (parameter.isAnnotationPresent(RequestParam.class)) {
            System.out.println("QueryParam: " + parameter.getName() + " - Type: " + parameter.getType().getSimpleName());
        } else {
            if (isDto(parameter.getType())) {
                Map<String, Object> dtoFields = extractDtoFieldsRecursive(parameter.getType(), 0);
                String json = new ObjectMapper().writeValueAsString(dtoFields);
                System.out.println("DTO Fields in JSON: " + json);
            } else {
                System.out.println("Parameter: " + parameter.getName() + " - Type: " + parameter.getType().getSimpleName());
            }
        }
    }

    // 재귀적으로 DTO 필드 정보를 추출하는 메서드
    private static Map<String, Object> extractDtoFieldsRecursive(Class<?> dtoClass, int depth) {
        Map<String, Object> dtoFields = new HashMap<>();

        for (Field field : dtoClass.getDeclaredFields()) {
            field.setAccessible(true);
            String fieldName = field.getName();
            String fieldType = field.getType().getSimpleName();

            // DTO가 다른 DTO를 포함할 경우 재귀적으로 처리
            if (isDto(field.getType()) && depth < 10) { // depth 제한을 두어 무한 재귀 방지
                Map<String, Object> nestedFields = extractDtoFieldsRecursive(field.getType(), depth + 1);
                dtoFields.put(fieldName, nestedFields);
            } else {
                dtoFields.put(fieldName, fieldType);
            }
        }

        return dtoFields;
    }

    private static boolean shouldSkipParameter(Parameter parameter) {
        Class<? extends Annotation>[] excludedAnnotations = new Class[]{
                AuthenticationPrincipal.class, SessionAttribute.class
        };

        for (Class<? extends Annotation> annotation : excludedAnnotations) {
            if (AnnotationUtils.findAnnotation(parameter, annotation) != null) {
                return true;
            }
        }

        return false;
    }

    private static String[] getPathsFromAnnotation(Annotation annotation) {
        try {
            Method valueMethod = annotation.getClass().getMethod("value");
            return (String[]) valueMethod.invoke(annotation);
        } catch (Exception e) {
            return new String[]{};
        }
    }

    private static RequestMethod[] getRequestMethodsFromAnnotation(Annotation annotation) {
        try {
            if (annotation instanceof RequestMapping) {
                return ((RequestMapping) annotation).method();
            } else if (annotation instanceof GetMapping) {
                return new RequestMethod[]{RequestMethod.GET};
            } else if (annotation instanceof PostMapping) {
                return new RequestMethod[]{RequestMethod.POST};
            } else if (annotation instanceof PutMapping) {
                return new RequestMethod[]{RequestMethod.PUT};
            } else if (annotation instanceof DeleteMapping) {
                return new RequestMethod[]{RequestMethod.DELETE};
            } else if (annotation instanceof PatchMapping) {
                return new RequestMethod[]{RequestMethod.PATCH};
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new RequestMethod[]{}; // 어노테이션이 없을 경우 빈 배열 반환
    }

    private static boolean isDto(Class<?> clazz) {
        return clazz.getPackage() != null && !clazz.isPrimitive() && !clazz.getName().startsWith("java.");
    }
}
