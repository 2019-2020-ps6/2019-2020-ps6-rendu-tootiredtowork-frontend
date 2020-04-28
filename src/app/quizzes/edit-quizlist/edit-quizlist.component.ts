import { Component, OnInit, Type } from '@angular/core';
import { Theme } from 'src/models/theme.model';
import { Quiz } from 'src/models/quiz.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationService } from 'src/services/configuration.service';
import { QuizService } from 'src/services/quiz.service';
import { EditableQuizComponent } from '../editable-quiz/editable-quiz.component';


@Component({
    selector: 'app-edit-quizlist',
    templateUrl: './edit-quizlist.component.html',
    styleUrls: ['./edit-quizlist.component.scss']
})
export class EditQuizListComponent implements OnInit {
    theme: Theme;
    quizzes: Quiz[];

    add: Function;

    constructor(public configService: ConfigurationService, public route: ActivatedRoute, private quizService: QuizService, private router: Router) {
        this.quizService.themeSelected$.subscribe((theme) => {
            console.log("ok");
            if (theme == null) this.router.navigateByUrl('/themelist');
            else {
                this.theme = theme;
                this.quizzes = new Array<Quiz>();
                this.theme.quizs.forEach((quiz) => this.quizzes.push(quiz));
            }
        });
        this.add = this.addQuiz.bind(this);
        this.configService.previouspage=router.url;

    }

    ngOnInit(): void {
    }

    addQuiz() {
        this.quizService.selectQuiz({} as Quiz);
        this.router.navigateByUrl('/createquiz');
    }

    getComponent(): Type<EditableQuizComponent> {
        return EditableQuizComponent;
    }

    getMock(): Quiz {
        return {
            id: "QUIZ1",
            difficulty: 3,
            questions: [
                {
                    label: "Question 1",
                    answers: [
                        {
                            value: "Réponse 1",
                            isCorrect: true
                        },
                        {
                            value: "Réponse 2",
                            isCorrect: false
                        },
                        {
                            value: "Réponse 3",
                            isCorrect: false
                        },
                        {
                            value: "Réponse 4",
                            isCorrect: false
                        }
                    ]
                }
            ]
        };
    }
}