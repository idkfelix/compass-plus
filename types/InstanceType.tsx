export interface Instance {
activityCode: string;
activityId: number;
activityManagerId: number;
activityName: string;
activityType: number;
attendanceMode: number;
canMarkRoll: boolean;
coveringManager: string;
coveringManagerGuid: string | null;
coveringManagerId: number | null;
coveringManagerName: string | null;
extendedStatusId: number;
finish: string;
instanceId: string;
locationName: string;
managerGuid: string;
managerId: number
oldLocationName: string;
originalManager: string;
originalManagerName: string;
priority: number;
runningStatus: number;
start: string;
studentLessonFileAssetId: string | null;
studentLessonPlan: string | null;
studentLessonPlanWikiId: string | null;
teacherLessonPlan: string | null;
}