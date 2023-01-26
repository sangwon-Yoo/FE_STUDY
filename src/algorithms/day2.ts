export const makeSuspensionList = (id_list: Array<string>, report: Array<string>, k: number) => {

    //중복제거
    const newReport = [...Array.from(new Set(report))];

    //각 유저별 신고객체 리스트
    return id_list.map(
        userId => {

            //각 유저가 신고한 사람들
            const reportedUserList = newReport.filter(
                reportItem => reportItem.split(' ')[0] == userId
            ).map(
                reportItem => reportItem.split(' ')[1]
            );

            //유저(본인)가 신고된 횟수
            const reportedNumber = newReport.filter(
                reportItem => reportItem.split(' ')[1] == userId
            ).length;


            return {
                userId : userId,                        //유저이름
                reportedUserList : reportedUserList,    //신고한 사람들
                reportedNumber : reportedNumber         //본인이 신고된 횟수
            };
        }
    );
};

const solution = (id_list: Array<string>, report: Array<string>, k: number) => {

    const suspensionList = makeSuspensionList(id_list, report, k);

    //필요 항목 추출 => 정지 처리되는 신고 횟수 list
    return suspensionList.map(
        suspension => {

            const numberOfSuspension = suspension.reportedUserList.filter(
                user => (suspensionList.find(userReport => userReport.userId === user)?.reportedNumber || 0) >= k
            ).length;

            return numberOfSuspension;
        }
    );
};

export const solution2 = (id_list: Array<string>, report: Array<string>, k: number) => {

    const userMap = new Map();  //각 유저가 신고한 유저들
    for(const id of id_list) {
        userMap.set(id, new Set());
    }
    for(const reportItem of report) {
        userMap.set(reportItem.split(' ')[0], userMap.get(reportItem.split(' ')[0]).add(reportItem.split(' ')[1]));
    }

    const userReportCount = new Map();  //각 유저가 신고된 갯수
    for(const id of id_list) {
        userReportCount.set(id, 0);
    }
    userMap.forEach((value) => {
        for(const reportedItem of Array.from(value)) {
            userReportCount.set(reportedItem, userReportCount.get(reportedItem) + 1);
        }
    });

    return id_list.map( //각 유저가 신고한 유저들 중 신고된 갯수가 이상
        id => Array.from(userMap.get(id)).filter(reportedItem => userReportCount.get(reportedItem) >= k).length
    );
};