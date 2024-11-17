package com.shooot.application.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Objects;
import java.util.Optional;

public final class FileHandler {

    public static Optional<File> toFile(MultipartFile multipartFile, String dir) {
        if(multipartFile == null) {
            return Optional.empty();
        }
        try {
            return Optional.of(convert(multipartFile, dir));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static byte[] getAllBytes(File file) {
        if(file == null) {
            return null;
        }
        try(FileInputStream fileInputStream = new FileInputStream(file)) {
            return fileInputStream.readAllBytes();
        }catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException();
        }
    }

    private static File convert(MultipartFile multipartFile, String parentDir) throws IOException {
        String path = parentDir + "/" + multipartFile.getName();
        File file = new File(path);
        file.getParentFile().mkdirs();
        file.createNewFile();

        try(FileOutputStream fos = new FileOutputStream(file)) {
            fos.write(multipartFile.getBytes());
            return file;
        }
    }
    public static String getMD5Checksum(File file)  {
        byte[] b = new byte[0];
        try {
            b = createChecksum(file);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        String result = "";

        for (int i=0; i < b.length; i++) {
            result += Integer.toString( ( b[i] & 0xff ) + 0x100, 16).substring( 1 );
        }
        return result;
    }

    public static byte[] createChecksum(File file) throws IOException {
        InputStream fis =  new FileInputStream(file);

        byte[] buffer = new byte[1024];
        MessageDigest complete = null;
        try {
            complete = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException ignored) {
        }
        int numRead;

        do {
            numRead = fis.read(buffer);
            if (numRead > 0) {
                complete.update(buffer, 0, numRead);
            }
        } while (numRead != -1);

        fis.close();
        return Objects.requireNonNull(complete).digest();
    }
}
