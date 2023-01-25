export const userSuspension = (id_list: Array<string>, report: Array<string>, k: number) => {

    //중복제거
    const newReport = [...Array.from(new Set(report))];

    //각 유저별 신고
    const reportListByUser = id_list.map(
        userId => {

            //각 유저가 신고한 사람들
            const userReportList = newReport.filter(
                reportItem => reportItem.split(' ')[0] == userId
            ).map(
                reportItem => reportItem.split(' ')[1]
            );

            //유저(본인)가 신고된 횟수
            const reportedNumber = newReport.filter(
                reportItem => reportItem.split(' ')[1] == userId
            ).length;


            return {
                userId : userId,                    //유저이름
                userReportList : userReportList,    //신고한 사람들
                reportedNumber : reportedNumber     //본인이 신고된 횟수
            };
        }
    );

    //추출
    return reportListByUser.map(
        report => {

            return report.userReportList.filter(
                user => (reportListByUser.find(userReport => userReport.userId === user)?.reportedNumber || 0) >= k
            ).length;
        }
    );
};