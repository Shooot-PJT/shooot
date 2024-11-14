package com.shooot.application.projecttest.handler;

import org.springframework.boot.loader.jar.NestedJarFile;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.net.URLClassLoader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

public class CustomClassLoader extends URLClassLoader {
    public static final String WRTIE_CLASSES = "writeClasses";
    public static final String LIBS = "libs";
    public CustomClassLoader(URL[] urls, ClassLoader parent) {
        super(urls, parent);
    }

    // 모든 클래스를 로드하는 메서드
    public Map<String,List<Class<?>>> loadAllClassesFromNestedJar(File file) throws IOException {
        Map<String,List<Class<?>>> classes = new HashMap<>();
        List<Class<?>> writeClasses = new ArrayList<>();
        List<Class<?>> libs = new ArrayList<>();
        classes.put(WRTIE_CLASSES, writeClasses);
        classes.put(LIBS, libs);
        // 메인 JAR 파일에서 클래스를 로드
        try (JarFile jarFile = new JarFile(file)) {
            Queue<JarEntry> entryQueue = getJarEntries(jarFile);

            boolean libIsProcessed = false;

            // BOOT-INF/classes 디렉토리를 로드할 수 있도록 URL 추가
            addURL(new URL("jar:" + Paths.get(file.getAbsolutePath()).toUri().toString() + "!/BOOT-INF/classes/"));

            while (!entryQueue.isEmpty()) {
                JarEntry entry = entryQueue.poll();

                if (isNestedJar(entry)) {
                    processNestedJar(file, entry, libs);
                    libIsProcessed = true;
                }

                if (libIsProcessed && isClassFile(entry, "BOOT-INF/classes/")) {
                    loadClassFromEntry(entry, "BOOT-INF/classes/", writeClasses);
                }

                if (!libIsProcessed) {
                    entryQueue.add(entry);  // 처리되지 않은 항목 재큐잉
                }
            }
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }

        return classes;
    }

    // JAR 엔트리를 큐로 변환하는 헬퍼 메서드
    private Queue<JarEntry> getJarEntries(JarFile jarFile) {
        return new ArrayDeque<>(Collections.list(jarFile.entries()));
    }

    // 중첩된 JAR 파일인지 확인하는 헬퍼 메서드
    private boolean isNestedJar(JarEntry entry) {
        return entry.getName().startsWith("BOOT-INF/lib/") && entry.getName().endsWith(".jar");
    }

    // 클래스 파일인지 확인하는 헬퍼 메서드
    private boolean isClassFile(JarEntry entry, String prefix) {
        return entry.getName().startsWith(prefix) && entry.getName().endsWith(".class");
    }

    // JAR 엔트리로부터 클래스를 로드하는 헬퍼 메서드
    private void loadClassFromEntry(JarEntry entry, String prefix, List<Class<?>> loadedClasses) throws ClassNotFoundException {
        String className = entry.getName().replace(prefix, "").replace("/", ".").replace(".class", "");
        Class<?> loadedClass = loadClass(className);
        if (className.contains("Controller")) {
            System.out.println("Loaded class: " + loadedClass.getName());
        }
        loadedClasses.add(loadedClass);
    }

    // 중첩된 JAR 파일 처리하는 메서드
    private void processNestedJar(File file, JarEntry entry, List<Class<?>> loadedClasses) throws IOException {
        try (NestedJarFile nestedJarFile = new NestedJarFile(file, entry.getName())) {
            String jarPath = "./jarPath/" + entry.getName();
            File nestedFile = createTemporaryFile(jarPath);

            Files.write(nestedFile.toPath(), nestedJarFile.getRawZipDataInputStream().readAllBytes());

            loadClassesFromJar(nestedJarFile, nestedFile, loadedClasses);

            deleteTemporaryFile(nestedFile);
        }
    }

    // 임시 파일 생성 헬퍼 메서드
    private File createTemporaryFile(String path) throws IOException {
        File file = Paths.get(path).toFile();
        file.getParentFile().mkdirs();
        file.createNewFile();
        return file;
    }

    // 임시 파일 삭제 헬퍼 메서드
    private void deleteTemporaryFile(File file) {
        file.delete();
        file.getParentFile().delete();
    }

    // 중첩된 JAR에서 클래스 로드
    private void loadClassesFromJar(NestedJarFile jarFile, File file, List<Class<?>> loadedClasses) throws IOException {
        addURL(new URL("jar:" + Paths.get(file.getAbsolutePath()).toUri().toString() + "!/"));
        Enumeration<JarEntry> entries = jarFile.entries();
        List<JarEntry> jarEntries = Collections.list(entries);

        for( JarEntry entry : jarEntries ) {
            if(entry.getName().endsWith(".jar")) {
                processNestedJar(file, entry, loadedClasses);
                break;
            }
        }

        for (JarEntry entry : jarEntries) {

            if (entry.getName().endsWith(".class")) {
                loadClassSafely(entry, loadedClasses);
            }
        }
    }

    // 클래스 안전하게 로드
    private void loadClassSafely(JarEntry entry, List<Class<?>> loadedClasses) {
        String className = entry.getName().replace("META-INF/", "").replaceFirst("versions/\\d+/", "").replace("/", ".").replace(".class", "");
        if(className.contains("module-info") || className.contains("package-info")) {
            return;
        }
        try {
            Class<?> loadedClass = loadClass(className);
            loadedClasses.add(loadedClass);
//            System.out.println("Loaded class: " + loadedClass.getName());
        } catch (ClassNotFoundException | NoClassDefFoundError e) {
//            System.err.println("Error loading class: " + className + " - " + e.getMessage());
        }catch ( UnsupportedClassVersionError |  ExceptionInInitializerError ignored) {

        }
    }
}
