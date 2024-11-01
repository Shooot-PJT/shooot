package com.shooot.application.api.domain.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.shooot.application.api.domain.ApiTestLog;
import com.shooot.application.api.domain.QApiTestLog;
import com.shooot.application.api.service.command.test.dto.TestLogSearchRequest;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import static com.shooot.application.api.domain.QApiTestLog.*;

@Repository
public class ApiTestLogQueryRepository {
    private final JPAQueryFactory query;

    public ApiTestLogQueryRepository(EntityManager em){
        this.query = new JPAQueryFactory(em);
    }

    public List<ApiTestLog> getTestLogs(TestLogSearchRequest testLogSearchRequest){
        return query
                .select(apiTestLog)
                .from(apiTestLog)
                .where(
                    apiTestCaseIdEq(testLogSearchRequest.getTestcaseId()),
                    apiTesterIdEq(testLogSearchRequest.getTesterId()),
                    betweenTestDate(testLogSearchRequest.getStartDate(), testLogSearchRequest.getEndDate())
                )
                .orderBy(apiTestLog.id.desc())
                .fetch();
    }

    /*
        private Integer testcaseId;
        private Integer testerId;
        private LocalDate startDate;
        private LocalDate endDate;
        private Pageable pageable;
     */

    //조건이 테스트케이스 아이디, 테스터 아이디, 시작일자, 끝난일자, pageable(page, size)
    private BooleanExpression apiTestCaseIdEq(Integer testCaseId){
        return testCaseId != null ? apiTestLog.apiTestCase.id.eq(testCaseId) : null;
    }

    private BooleanExpression apiTesterIdEq(Integer testerId){
        return testerId != null ? apiTestLog.projectParticipant.user.id.eq(testerId) : null;
    }

    private BooleanExpression apiSuccessEq(Boolean isSuccess){
        return isSuccess != null ? apiTestLog.projectParticipant.
    }

    private BooleanExpression betweenTestDate(LocalDate startDate, LocalDate endDate){
        BooleanExpression condition = null;
        if (startDate != null && endDate != null) {
            condition = apiTestLog.createdAt.between(startDate.atStartOfDay(), endDate.plusDays(1).atStartOfDay());
        } else if (startDate != null) {
            condition = apiTestLog.createdAt.goe(startDate.atStartOfDay());
        } else if (endDate != null) {
            condition = apiTestLog.createdAt.loe(endDate.atStartOfDay());
        }

        return condition;
    }


}
