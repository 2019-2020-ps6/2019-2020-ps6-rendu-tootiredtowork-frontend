import { Component, OnInit, Input } from '@angular/core';
import { ConfigurationService } from 'src/services/configuration.service';
import { Router } from '@angular/router';
import { Theme } from 'src/models/theme.model';

import { QuizService } from 'src/services/quiz.service';
import { CarouselItemComponent } from 'src/app/carousel/carousel-item.component';

/**
 * Composant représentant une thème dans la page ThemeList
 */
@Component({
    selector: 'app-theme',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit, CarouselItemComponent {

    @Input()
    data: Theme;

    constructor(private router: Router, public configService: ConfigurationService, public quizService: QuizService) {
    }

    ngOnInit(): void {
    }

    /**
     * Appelé lorsque le theme est selectionné
     */
    themeSelected() {
        this.quizService.selectTheme(this.data);
        this.router.navigateByUrl("/quizlist");
    }

    /**
     * Renvoie une chaine de 21 espaces.
     * (Utilisée pour avoir une taille fixe)
     */
    getWhiteSpaceString() {
        var retour: String = "";
        for (var i = 0; i < 21; i++) {
            retour = retour.concat(" ");
        }
        return retour;
    }
}