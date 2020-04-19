import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Theme } from 'src/models/theme.model';
import { Quiz } from 'src/models/quiz.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationService } from 'src/services/configuration.service';
import { QuizService } from 'src/services/quiz.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { DeleteQuizDialog } from 'src/app/dialogs/delete-quiz/delete-quiz-dialog.component';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';


@Component({
    selector: 'app-edit-quizlist',
    templateUrl: './edit-quizlist.component.html',
    styleUrls: ['./edit-quizlist.component.scss']
})
export class EditQuizListComponent implements OnInit {
    theme: Theme;
    quizzes: Quiz[];


    public quizForm: FormGroup;



    

    constructor(public configService: ConfigurationService, public route: ActivatedRoute, private quizService: QuizService, private dialog: MatDialog, private router: Router) {
        if (quizService.themeSelected == null) this.router.navigateByUrl('/themelist');
        this.theme = quizService.themeSelected;

        this.quizService.selectAllQuizzesFromTheme(this.route.snapshot.paramMap.get('theme'));
        this.quizService.quizzes$.subscribe((quiz: Quiz[]) => {
            this.quizzes = quiz;
        });
    }

    ngOnInit(): void {
    }

    deleteQuiz(quiz: Quiz) {

        const dialogRef = this.openDialog();
        dialogRef.afterClosed().subscribe(
            result => {
                if (result) this.quizService.deleteQuiz(quiz);
            }
        )
    }

    openDialog(): MatDialogRef<DeleteQuizDialog, any> {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;

        dialogConfig.autoFocus = true;

        return this.dialog.open(DeleteQuizDialog, dialogConfig);
    }

    addQuiz() {
        
        const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    
        this.quizService.updateTheme(this.route.snapshot.paramMap.get('theme'),quizToCreate, Number(this.route.snapshot.paramMap.get('number')));
      }

}