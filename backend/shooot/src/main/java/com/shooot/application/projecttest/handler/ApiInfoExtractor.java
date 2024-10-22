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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ApiInfoExtractor {

    public static void extractApiInfo(Map<String, List<Class<?>>> stringListMap) throws Exception {
        List<Class<?>> classes = stringListMap.get(CustomClassLoader.WRTIE_CLASSES);

        for (Class<?> clazz : classes) {
            boolean isRestController = clazz.isAnnotationPresent(RestController.class);
            boolean isController = clazz.isAnnotationPresent(Controller.class);

            if (isRestController || isController) {
                for (Method method : clazz.getDeclaredMethods()) {
                    if (isRestController || method.isAnnotationPresent(ResponseBody.class)) {
                        extractEndpointInfo(method);
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
    }

    private static void extractEndpointInfo(Method method) {
        Class<? extends Annotation>[] httpAnnotations = new Class[]{
                RequestMapping.class, GetMapping.class, PostMapping.class, PutMapping.class, DeleteMapping.class, PatchMapping.class
        };

        for (Class<? extends Annotation> annotationClass : httpAnnotations) {
            Annotation annotation = method.getAnnotation(annotationClass);
            if (annotation != null) {
                String[] paths = getPathsFromAnnotation(annotation);
                System.out.println("API Endpoint: " + String.join(", ", paths) + " - Method: " + method.getName());
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

    private static boolean isDto(Class<?> clazz) {
        return clazz.getPackage() != null && !clazz.isPrimitive() && !clazz.getName().startsWith("java.");
    }
}
