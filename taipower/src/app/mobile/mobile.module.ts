import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileRoutingModule } from './mobile-routing.module';
import { IndexComponent } from './index/index.component';
import { HistoryComponent } from './history/history.component';
import { HistoryItemComponent } from './history/history-item/history-item.component';
import { NotificationComponent } from './notification/notification.component';
import { NotionComponent } from './notion/notion.component';
import { ReportComponent } from './report/report.component';


@NgModule({
  declarations: [IndexComponent, HistoryComponent, HistoryItemComponent, NotificationComponent, NotionComponent, ReportComponent],
  imports: [
    CommonModule,
    MobileRoutingModule
  ]
})
export class MobileModule { }
