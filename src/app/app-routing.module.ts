import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/Auth/login/login.component';
import { LoginGuard } from './Guard/login.guard';
import { AuthGuard } from './Guard/auth.guard';
import { RegistrationComponent } from './pages/Auth/registration/registration.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { VoteComponent } from './pages/vote/vote.component';
import { SurveyComponent } from './pages/survey/survey.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { CooperationComponent } from './pages/cooperation/cooperation.component';
import { ContributionComponent } from './pages/contribution/contribution.component';
import { SurveyFormComponent } from './pages/survey-form/survey-form.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UpdateProfileComponent } from './pages/profile/update-profile/update-profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'vote',
    component: VoteComponent,
  },
  {
    path: 'survey',
    component: SurveyComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'coopration',
    component: CooperationComponent,
  },
  {
    path: 'contribution',
    component: ContributionComponent,
  },
  {
    path: 'survey-form/:id',
    component: SurveyFormComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'profile-update',
    component: UpdateProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
