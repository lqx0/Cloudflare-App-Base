CREATE TABLE quiz_questions (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('multiple_choice', 'true_false', 'free_text')),
  prompt TEXT NOT NULL,
  optionsJson TEXT,
  correctAnswer TEXT NOT NULL,
  createdByUserId TEXT NOT NULL,
  createdAt INTEGER NOT NULL,
  FOREIGN KEY (createdByUserId) REFERENCES users(id)
);

CREATE INDEX idx_quiz_questions_type ON quiz_questions(type);
