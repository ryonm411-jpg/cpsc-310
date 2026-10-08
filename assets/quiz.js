// CPSC 310 prep — shared interactive components.
//
// Multiple choice:
//   <div class="quiz" data-answer="Position">
//     <p class="q">…</p>
//     <div class="opts"><button class="opt">Name</button>…</div>
//     <div class="why">Explanation shown after answering.</div>
//   </div>
//   The first click locks the answer (retrieval, not guess-and-check).
//
// Free response:
//   <div class="free" data-key="lesson1-fr">
//     <textarea></textarea><button class="reveal">Compare with rubric</button>
//     <div class="rubric"><label><input type="checkbox"> criterion</label>…</div>
//   </div>
//   Draft text is kept in localStorage so it survives a reload.
//
// Score: any element with class "score" shows "n / total" for the page.

(function () {
  function store(key, val) {
    try {
      if (val === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, val);
    } catch (e) { return null; }
  }

  const quizzes = Array.from(document.querySelectorAll(".quiz"));
  let correct = 0, answered = 0;

  function updateScore() {
    document.querySelectorAll(".score").forEach(function (el) {
      el.textContent = answered === 0
        ? quizzes.length + " questions"
        : correct + " / " + answered + " correct" + (answered === quizzes.length ? " — done" : "");
    });
  }

  quizzes.forEach(function (quiz, i) {
    const n = document.createElement("div");
    n.className = "n";
    n.textContent = "question " + (i + 1) + " of " + quizzes.length;
    quiz.prepend(n);

    const answer = quiz.dataset.answer;
    const opts = Array.from(quiz.querySelectorAll("button.opt"));
    opts.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (quiz.classList.contains("done")) return;
        quiz.classList.add("done");
        answered++;
        const ok = btn.textContent.trim() === answer;
        if (ok) correct++;
        btn.classList.add(ok ? "right" : "wrong");
        opts.forEach(function (o) {
          if (o.textContent.trim() === answer) o.classList.add("right");
          o.disabled = true;
        });
        updateScore();
      });
    });
  });
  updateScore();

  document.querySelectorAll(".free").forEach(function (box) {
    const ta = box.querySelector("textarea");
    const key = "cpsc310:" + (box.dataset.key || "free");
    const saved = store(key);
    if (saved) ta.value = saved;
    ta.addEventListener("input", function () { store(key, ta.value); });
    box.querySelector("button.reveal").addEventListener("click", function () {
      if (ta.value.trim().length < 40) {
        ta.placeholder = "Write your answer first — the rubric only helps after you've committed.";
        ta.focus();
        return;
      }
      box.classList.add("revealed");
    });
  });
})();
