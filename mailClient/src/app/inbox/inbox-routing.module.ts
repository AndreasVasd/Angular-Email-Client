import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlaceholderComponent } from '../inbox/placeholder/placeholder.component';
import { EmailShowComponent } from '../inbox/email-show/email-show.component';
import { EmailResolverService } from './email-resolver.service';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    children: [
      { path: '', component: PlaceholderComponent },
      { path: ':id', component: EmailShowComponent,
        resolve: {
          email: EmailResolverService //the value is the source of data
                                      //τρεχει η resolve μεσα στο service και τα data που γυρναει τα κανει
                                      //assign στο email...επειτα κανει pass στο component το email obj
        } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
