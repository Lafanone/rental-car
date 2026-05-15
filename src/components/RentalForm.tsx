"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./RentalForm.module.css";

type RentalFormProps = {
  carId: string;
  fieldsOnly?: boolean;
};

export function RentalForm({ carId, fieldsOnly = false }: RentalFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingDateInputType, setBookingDateInputType] = useState<
    "text" | "date"
  >("text");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      if (!name.trim() || !email.trim() || !bookingDate) {
        toast.error("Route not found");
        return;
      }

      toast.success("Booking request sent successfully!");
      setName("");
      setEmail("");
      setBookingDate("");
      setBookingDateInputType("text");
      setComment("");
    } catch {
      toast.error("Failed to send booking request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formInner = (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <input
            id="rental-name"
            className={styles.input}
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name*"
            autoComplete="name"
            required
          />
        </div>

        <div className={styles.field}>
          <input
            id="rental-email"
            className={styles.input}
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email*"
            autoComplete="email"
            required
          />
        </div>

        <div className={styles.field}>
          <input
            id="rental-date"
            className={styles.input}
            type={bookingDateInputType}
            name="bookingDate"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            onFocus={(e) => {
              (e.target as HTMLInputElement).type = "date";
              setBookingDateInputType("date");
            }}
            onBlur={(e) => {
              const el = e.target as HTMLInputElement;
              if (!el.value) {
                el.type = "text";
                setBookingDateInputType("text");
              }
            }}
            placeholder="Booking date"
            required
          />
        </div>

        <div className={styles.field}>
          <textarea
            id="rental-comment"
            className={styles.textarea}
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comment"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className={styles.submit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending…" : "Send"}
        </button>
      </form>
  );

  if (fieldsOnly) {
    return <div className={styles.card}>{formInner}</div>;
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Book your car now</h2>
      <p className={styles.intro}>
        Stay connected! We are always ready to help you.
      </p>
      {formInner}
    </div>
  );
}
