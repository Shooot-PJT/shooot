package com.shooot.application.api.domain.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.shooot.application.api.domain.ApiTestLog;
import com.shooot.application.api.service.command.testcase.dto.TestLogSearchRequest;
import com.shooot.application.api.service.query.testcase.dto.ApiTestLogInfiniteResponse;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static com.shooot.application.api.domain.QApiTestLog.*;

@Repository
public class ApiTestLogQueryRepository {
    private final JPAQueryFactory query;

    public ApiTestLogQueryRepository(EntityManager em){
        this.query = new JPAQueryFactory(em);
    }

    @Transactional
    public Slice<ApiTestLogInfiniteResponse> getTestLogs(TestLogSearchRequest testLogSearchRequest, Pageable pageable){
        List<ApiTestLog> results = query
                .select(apiTestLog)
                .from(apiTestLog)
                .where(
                        apiIdEq(testLogSearchRequest.getApiId()),
                        apiTestCaseIdEq(testLogSearchRequest.getTestcaseId()),
                        apiTesterIdEq(testLogSearchRequest.getTesterId()),
                        apiSuccessEq(testLogSearchRequest.getIsSuccess()),
                        betweenTestDate(testLogSearchRequest.getStartDate(), testLogSearchRequest.getEndDate())
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1)
                .orderBy(apiTestLog.id.desc())
                .fetch();

        List<ApiTestLogInfiniteResponse> infiniteResponseList = results.stream()
                .limit(pageable.getPageSize())
                .map(ApiTestLog::from)
                .toList();

        return new SliceImpl<>(infiniteResponseList, pageable, hasNextPage(results, pageable.getPageSize()));

    }

    private boolean hasNextPage(List<ApiTestLog> results, int pageSize){
        if (results.size() > pageSize) {
            results.remove(pageSize);
            return true;
        }
        return false;
    }

    /*
        private Integer testcaseId;
        private Integer testerId;
        private LocalDate startDate;
        private LocalDate endDate;
        private Pageable pageable;
     */

    //조건이 테스트케이스 아이디, 테스터 아이디, 시작일자, 끝난일자, pageable(page, size)
    private BooleanExpression apiIdEq(Integer apiId){
        return apiId != null ? apiTestLog.apiTestCase.api.id.eq(apiId) : null;
    }

    private BooleanExpression apiTestCaseIdEq(Integer testCaseId){
        return testCaseId != null ? apiTestLog.apiTestCase.id.eq(testCaseId) : null;
    }

    private BooleanExpression apiTesterIdEq(Integer testerId){
        return testerId != null ? apiTestLog.projectParticipant.user.id.eq(testerId) : null;
    }

    private BooleanExpression apiSuccessEq(Boolean isSuccess){
        return isSuccess != null ? apiTestLog.isSuccess.eq(isSuccess) : null;
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
