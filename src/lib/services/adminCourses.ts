import { http } from "@/lib/http";

export type AdminCourseStatus = "DRAFT" | "PUBLISHED";

export type AdminCourse = {
  id: string;
  title: string;
  description: string;
  level: string | null;
  durationWeeks: number | null;
  status: AdminCourseStatus;
};

export type AdminCoursePayload = {
  title: string;
  description: string;
  level?: string;
  durationWeeks?: number;
  status?: AdminCourseStatus;
};

const ServiceId = {
  CREATE_ADMIN_COURSE: "/api/admin/courses",
  FETCH_ADMIN_COURSES: "/api/admin/courses",
}

export async function createAdminCourse(payload: AdminCoursePayload) {
  const data = await http.post<{ course: AdminCourse }>(
    ServiceId.CREATE_ADMIN_COURSE,
    payload,
    { auth: true },
  );
  return data.course;
}

export async function fetchAdminCourses() {
  const data = await http.get<{ courses: AdminCourse[] }>(ServiceId.FETCH_ADMIN_COURSES, {
    auth: true,
  });
  return data.courses;
}
