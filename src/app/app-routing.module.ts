import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./main/home/home.component";
import {NewGameComponent} from "./main/new-game/new-game.component";
import {RankComponent} from "./main/rank/rank.component";
import {ScoreComponent} from "./main/score/score.component";
import {SuggestQuestionComponent} from "./main/suggest-question/suggest-question.component";
import {InviteFriendsComponent} from "./main/invite-friends/invite-friends.component";
import {HowItWorkComponent} from "./main/how-it-work/how-it-work.component";
import {LoginComponent} from "./main/auth/login/login.component";
import {AuthGuard} from "./core/_guards/auth.guard";
import {CheckTokenGuard} from "./core/_guards/check-token.guard";
import {ProfileComponent} from "./main/auth/profile/profile.component";


const routes: Routes = [
  {
    path: '',
    canActivate: [CheckTokenGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          title: 'Accueil'
        },
        pathMatch: 'full'
      },
      {
        path: 'accueil',
        component: HomeComponent,
        data: {
          title: 'Accueil'
        }
      },
      {
        path: 'nouveau-jeu',
        canActivate: [AuthGuard],
        component: NewGameComponent,
        data: {
          title: 'Nouveau jeu'
        }
      },
      {
        path: 'classement-top-30',
        component: RankComponent,
        data: {
          title: 'Classement top 30'
        }
      },
      {
        path: 'mes-points',
        canActivate: [AuthGuard],
        component: ScoreComponent,
        data: {
          title: 'Mes points'
        }
      },
      {
        path: 'proposer-questions',
        canActivate: [AuthGuard],
        component: SuggestQuestionComponent,
        data: {
          title: 'Proposer une question'
        }
      },
      {
        path: 'inviter-amis',
        canActivate: [AuthGuard],
        component: InviteFriendsComponent,
        data: {
          title: 'Inviter des ami(e)s'
        }
      },
      {
        path: 'comment-ca-marche',
        component: HowItWorkComponent,
        data: {
          title: 'Comment ca marche'
        }
      },
      {
        path: 'mon-compte',
        canActivate: [AuthGuard],
        component: ProfileComponent,
        data: {
          title: 'Votre profil'
        }
      },
      {
        path: 'connexion',
        canActivate: [AuthGuard],
        component: LoginComponent,
        data: {
          title: 'Connexion Compte'
        }
      },
      {
        path: '**',
        component: HomeComponent,
        data: {
          title: 'Accueil'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
