import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { HistoryComponent } from './history/history.component';
import { HistoryItemComponent } from './history/history-item/history-item.component';
import { NotificationComponent } from './notification/notification.component';
import { NotionComponent } from './notion/notion.component';
import { ReportComponent } from './report/report.component';
import { MobileComponent } from './mobile.component';


const routes: Routes = [
  { path: "", component: MobileComponent, children: [
    { path: "index", component: IndexComponent },
    { path: "history", children: [
      { path: "", component: HistoryComponent },
      { path: ":id", component: HistoryItemComponent }
    ]},
    { path: "notification", component: NotificationComponent },
    { path: "notion", component: NotionComponent },
    { path: "report", component: ReportComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
