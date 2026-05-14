"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { bookCar } from "@/api/api";
import styles from "./RentalForm.module.css";

type RentalFormProps = {
  carId: string;
  fieldsOnly?: boolean;
};

export function RentalForm({ carId, fieldsOnly = false }: RentalFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await bookCar(carId, {
        name: name.trim(),
        email: email.trim(),
        bookingDate,
        comment: comment.trim() || undefined,
      });
      toast.success("Booking requests sent successfully!");
      setName("");
      setEmail("");
      setBookingDate("");
      setComment("");
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? typeof err.response?.data === "object" &&
          err.response?.data !== null &&
          "message" in err.response.data
          ? String(
              (err.response.data as { message?: string }).message ??
                err.message,
            )
          : err.message
        : "Failed to send booking request.";
      toast.error(message);
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
            type="date"
            name="bookingDate"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
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
