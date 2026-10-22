import QuickConsultation from "@/components/home/QuickConsultation";
import styles from "./ConsultationForm.module.css";

/** The dedicated page shares the homepage form and its validation/draft flow. */
export default function ConsultationForm({
  initialCountry,
  initialGoal,
}: {
  initialCountry?: string;
  initialGoal?: string;
}) {
  return (
    <div className={styles.surface}>
      <QuickConsultation
        initialCountry={initialCountry}
        initialGoal={initialGoal}
      />
    </div>
  );
}
