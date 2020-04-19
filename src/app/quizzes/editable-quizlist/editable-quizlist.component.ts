import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quiz } from 'src/models/quiz.model';
import { ConfigurationService } from 'src/services/configuration.service';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { QuizService } from 'src/services/quiz.service';

@Component({
    selector: 'app-editable-quizlist',
    templateUrl: './editable-quizlist.component.html',
    styleUrls: ['./editable-quizlist.component.scss']
})
export class EditableQuizListComponent implements OnInit {
    faStar = faStar;

    @Input()
    quiz: Quiz;

    @Output()
    deleteQuiz: EventEmitter<Quiz> = new EventEmitter<Quiz>();


    stars: number[] = [];

    constructor(private router: Router, public configService: ConfigurationService, public quizService: QuizService) {
    }

    ngOnInit(): void {
        for (var i = 0; i < this.quiz.difficulty; i++) {
            this.stars.push(i);
        }
    }

    quizSelected() {
        this.router.navigateByUrl(this.router.url + "/" + this.quiz.id);
    }

    delete() {
        this.deleteQuiz.emit(this.quiz);
    }
}