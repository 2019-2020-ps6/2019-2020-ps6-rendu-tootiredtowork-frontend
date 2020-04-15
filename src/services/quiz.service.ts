import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { Question } from '../models/question.model';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import { QUIZZES } from 'src/mocks/quiz.mock';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private quizzes: Quiz[] = QUIZZES;

  private quiz: Quiz = this.quizzes[0];

  quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);

  quizSelected$: BehaviorSubject<Quiz> = new BehaviorSubject(this.quiz);

  score: number;

  private quizUrl = serverUrl + '/quizzes';


  constructor(private http: HttpClient) {
    this.selectAllQuizzes();
  }

  setSelectedQuiz(quizId: string) {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quiz = quiz;
      this.quizSelected$.next(quiz);
    });
  }

  selectAllQuizzes() {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);

    });
  }

  updateQuizz(quiz: Quiz, question: Question, position: number) {
    const quizzUrl = this.quizUrl + '/' + quiz.id + '/' + position;
    console.log(quizzUrl);
    this.http.post<Question>(quizzUrl, question).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteQuiz(quiz: Quiz) {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    var index = this.quizzes.indexOf(quiz);
    this.http.delete<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizzes.splice(index, 1);
      this.quizzes$.next(this.quizzes);

    });
  }

  clear() {
    this.quizSelected$ = new BehaviorSubject(this.quiz);
    this.score = 0;
  }
}