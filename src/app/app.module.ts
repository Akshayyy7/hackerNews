import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FlashMessagesModule } from 'angular2-flash-messages';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'item', component: newsComponent },
  { path: 'additem', component: AddItemComponent, canActivate: [AdminGuard] },
  { path: 'item/:id', component: ItemDescComponent },
  { path: 'queries', component: QueriesComponent},
  { path: 'queries/:id', component: ItemDescComponent },
  { path: 'subscribers', component:ViewSubscribersComponent, canActivate: [AdminGuard] },
  { path: 'authors', component:AuthorsComponent},
  { path: 'erdiagram', component:ErdiagramComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    AngularFireAuthModule,
  FlashMessagesModule.forRoot(),
    AngularFireStorageModule,
    CoreModule

  ],
  exports: [RouterModule],
  declarations: [HomeComponent, ItemDescComponent, QueriesComponent,  ViewSubscribersComponent,AuthorsComponent, ErdiagramComponent]
})
export class AppRoutingModule { }


import { AppComponent } from './app.component';
import { newsComponent } from './components/news/news.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { HomeComponent } from './components/home/home.component';
import { ItemDescComponent } from './components/item-desc/item-desc.component';
import { CoreModule } from './core/core.module';

import { newsService } from './services/news.service';
import { AuthService } from './core/auth.service';

import { AuthGuard } from './core/auth.guard';
import { AdminGuard } from './core/admin.guard';
import { QueriesComponent } from './components/queries/queries.component';
import { ViewSubscribersComponent } from './components/view-subscribers/view-subscribers.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { ErdiagramComponent } from './components/erdiagram/erdiagram.component';

@NgModule({
  declarations: [
    AppComponent,
    newsComponent,
    HomeComponent,
    NavbarComponent,
    AddItemComponent,
    ItemDescComponent,
    QueriesComponent,
    ViewSubscribersComponent,
    AuthorsComponent,
    ErdiagramComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'progress'),
    AngularFirestoreModule,
    RouterModule.forRoot(routes),
    FormsModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FlashMessagesModule.forRoot(),
    CoreModule
  ],
  providers: [newsService, AuthService, AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
