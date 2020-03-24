import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from 'src/models/quizz.model';
import { QUIZ } from 'src/mocks/quiz.mock';
import { Answer } from 'src/models/answer.model';
import { Question } from 'src/models/question.model';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
    quiz: Quiz = QUIZ;

    max = this.quiz.questions.length;
    seek = 0;
    current: Question = this.quiz.questions[this.seek];

    score = 0;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    next() {
        if (this.seek < this.max - 1) {
            this.current = this.quiz.questions[++this.seek];
        }
        else {
            this.router.navigateByUrl('/result/' + this.score + '/' + this.max);
        }
    }

    answered(answer: Answer) {
        if (answer.isCorrect) this.score++;
        this.next();
    }
}