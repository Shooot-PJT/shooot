package com.shooot.application.common.infra.storage.service;

import com.shooot.application.common.infra.storage.domain.File;
import com.shooot.application.common.infra.storage.exception.FileDownloadFailedException;
import com.shooot.application.common.infra.storage.exception.FileNotFoundException;
import com.shooot.application.common.infra.storage.exception.FileUploadFailedException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
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
}
