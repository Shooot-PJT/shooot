package com.shooot.application.user.ui.dto;

import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EmailIsValidView {
    private Boolean isValid;
}
