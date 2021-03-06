import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from 'src/models/quiz.model';
import { Answer } from 'src/models/answer.model';
import { Question } from 'src/models/question.model';
import { ConfigurationService } from 'src/services/configuration.service';

import { QuizService } from 'src/services/quiz.service';
import { GameService } from 'src/services/game.service';

/**
 * Component de la page QuizGame
 */
@Component({
    selector: 'app-quiz-game',
    templateUrl: './quiz-game.component.html',
    styleUrls: ['./quiz-game.component.scss']
})
export class QuizGameComponent implements OnInit {
    quiz: Quiz;
    current: Question;

    seek = 0;
    score = 0;

    max;

    constructor(private router: Router, public configService: ConfigurationService, public quizService: QuizService, public gameService: GameService) {
        quizService.quizSelected$.subscribe((quiz) => {
            if (quiz == null) this.router.navigateByUrl('/themelist');
            else {
                this.quiz = quiz;
                this.max = this.quiz.questions.length;
                this.current = this.quiz.questions[this.seek];
            }
        });
    }

    ngOnInit() {
    }

    /**
     * Passe à la question suivante
     */
    next() {
        if (this.seek < this.max - 1) {
            this.current = this.quiz.questions[++this.seek];
        }
        else {
            this.gameService.setGame(this.quiz, this.score);
            this.router.navigateByUrl('/result');
        }
    }

    /**
     * Méthode appelée lorsque l'utilisateur à répondu à la question courante.
     * @param answer - La réponse de l'utilisateur
     */
    answered(answer: Answer) {
        if (answer.isCorrect) this.score++;
        this.next();
    }
}