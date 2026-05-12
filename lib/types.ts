// HealthDesk Wellness — Type Definitions (Purple/Emerald Theme)

export type WellnessStatus = "Thriving" | "Monitoring" | "NeedsAttention";
export type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
export type ScoreTrend = "up" | "down" | "stable";

export interface HealthMetric {
  id: string;
  patientId: string;
  type: "HeartRate" | "BloodPressure" | "Temperature" | "Steps" | "Water";
  value: number;
  unit: string;
  timestamp: string;
}

export interface Wellness {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  bloodType: BloodType;
  primaryConcern: string;
  status: WellnessStatus;
  enrolledDate: string;
  coordinator: string;
  phone: string;
  email: string;
  healthGoals: string[];
  activeMetrics: HealthMetric[];
  wellnessScore: number; // 0-100
}

export interface WellnessGoal {
  id: string;
  patientId: string;
  goalName: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  status: "Active" | "Completed" | "Abandoned";
}

export type AppointmentStatus = "Scheduled" | "Completed" | "Cancelled";

export interface WellnessAppointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  type: "Consultation" | "Follow-up" | "Assessment" | "Coaching";
  coordinator: string;
  status: AppointmentStatus;
}

export interface DashboardStats {
  totalPatients: number;
  activeWellness: number;
  appointmentsThisWeek: number;
  goalsCompleted: number;
}

// ========== MEDICATION TYPES ==========

export type MedicationStatus = "Active" | "Paused" | "Completed";
export type MedicationCategory =
  | "Cardiovascular"
  | "Metabolic"
  | "Vitamins & Supplements"
  | "Mental Health"
  | "Respiratory"
  | "Diabetes"
  | "General";

export interface Medication {
  id: string;
  patientId: string;
  patientName: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  category: MedicationCategory;
  status: MedicationStatus;
  notes?: string;
}

// ========== VITALS TYPES ==========

export type VitalType = "HeartRate" | "BloodPressure" | "Temperature" | "Steps" | "Water" | "Weight" | "OxygenSaturation";

export interface Vital {
  id: string;
  patientId: string;
  type: VitalType;
  value: number;
  unit: string;
  timestamp: string;
  trend: ScoreTrend;
}

export interface VitalHistory {
  patientId: string;
  week: string;
  heartRate: number;
  bloodPressure: number;
  temperature: number;
  steps: number;
}
