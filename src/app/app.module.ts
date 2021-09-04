import { ProductService } from './services/product.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/common/navbar/navbar.component';
import { FooterComponent } from './pages/common/footer/footer.component';
import { RegistrationComponent } from './pages/Auth/registration/registration.component';
import { LoginComponent } from './pages/Auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginGuard } from './Guard/login.guard';
import { Auth2Guard } from './Guard/auth2.guard';
import { AuthGuard } from './Guard/auth.guard';
import { FormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { VoteComponent } from './pages/vote/vote.component';
import { SurveyComponent } from './pages/survey/survey.component';
import { CooperationComponent } from './pages/cooperation/cooperation.component';
import { ContributionComponent } from './pages/contribution/contribution.component';
import { SliderComponent } from './pages/common/slider/slider.component'
import { TopicsService } from './services/topics.service';
import { SliderService } from './services/slider.service';
import { TopicsComponent } from './pages/common/topics/topics.component';
import { ProductsComponent } from './pages/common/products/products.component';
import { CategoriesComponent } from './pages/common/categories/categories.component';
import { CategoryService } from './services/category.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    VoteComponent,
    SurveyComponent,
    CooperationComponent,
    ContributionComponent,
    SliderComponent,
    TopicsComponent,
    ProductsComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    LoginGuard,
    Auth2Guard,
    AuthGuard,
    TopicsService,
    ProductService,
    SliderService,
    CategoryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
