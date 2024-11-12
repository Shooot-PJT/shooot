package com.shooot.application.common.infra.storage.service;

import com.shooot.application.api.domain.Api;
import com.shooot.application.api.domain.ApiTestCase;
import com.shooot.application.api.domain.ApiTestFile;
import com.shooot.application.api.exception.testcase.TestCaseFileNotValidException;
import com.shooot.application.common.infra.storage.domain.File;
import com.shooot.application.common.infra.storage.exception.FileDownloadFailedException;
import com.shooot.application.common.infra.storage.exception.FileNotFoundException;
import com.shooot.application.common.infra.storage.exception.FileUploadFailedException;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
@Slf4j
public class FileStorageService {

    @Value("${storage.upload-directory}")
    private String uploadDirectory;

    public File uploadFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new FileNotFoundException();
        }
        try {
            String filename = UUID.randomUUID().toString();
            Path path = Paths.get(uploadDirectory, filename);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            return File.builder()
                .filename(filename)
                .contentType(file.getContentType())
                .build();
        } catch (IOException e) {
            throw new FileUploadFailedException();
        }
    }

    public String uploadFile(String base64String) {
        String fileName = UUID.randomUUID().toString();
        String filePath = uploadDirectory + "/" + fileName;

        int separatorIndex = base64String.indexOf(";base64,");
        String contentType = base64String.substring(5, separatorIndex);
        String base64Data = base64String.substring(separatorIndex + 8);

        log.info("contentType = {}, base64Data = {}", contentType, base64Data);
        byte[] binaryData = Base64.getDecoder().decode(base64Data);

        String filePathWithExt = filePathWithExtension(contentType, filePath);

        try(FileOutputStream fos = new FileOutputStream(filePathWithExt)){
            fos.write(binaryData);

            return filePathWithExt;
        } catch(Exception e){
            e.printStackTrace();
            throw new TestCaseFileNotValidException();
        }
    }

    public ResponseEntity<Resource> downloadFile(File file) {
        try {
            Path path = Paths.get(uploadDirectory).resolve(file.getFilename()).normalize();
            Resource resource = new UrlResource(path.toUri());
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(file.getContentType()))
                    .body(resource);
            } else {
                throw new FileDownloadFailedException();
            }
        } catch (IOException e) {
            throw new FileNotFoundException();
        }
    }

    private String filePathWithExtension(String contentType, String targetPath){
        String extension = "";

        switch (contentType) {
            case "application/pdf":
                extension = "pdf";
                break;
            case "application/vnd.ms-excel":
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                extension = "xlsx";  // .xlsx 엑셀 파일
                break;
            case "image/jpeg":
                extension = "jpg";
                break;
            case "image/png":
                extension = "png";
                break;
            case "text/plain":
                extension = "txt";
                break;
            case "application/zip":
                extension = "zip";
                break;
            case "application/vnd.ms-powerpoint":
                extension = "pptx";
                break;
            // 기타 MIME 타입 추가...
            default:
                extension = "bin";  // 기본적으로 .bin 확장자 사용
        }

        return targetPath + "." + extension;


    }
}
