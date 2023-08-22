import {AdminLoginComponent} from "./admin.login.component";
import {AdminBasePanelComponent} from "./admin.base.panel.component";
import {AdminViewBookComponent} from "./admin.view.book.component";
import {AdminAddBooksComponent} from "./admin.add.books.component";
import {AdminViewMemberComponent} from "./admin.view.member.component";
import {AdminViewAllPurchaseBookComponent} from "./admin.view.all.purchase.book.component";

export const adminComp: any[] = [
  AdminLoginComponent, AdminBasePanelComponent,
  AdminViewBookComponent, AdminAddBooksComponent,
  AdminViewMemberComponent, AdminViewAllPurchaseBookComponent
]

export * from "./admin.login.component";
export * from "./admin.base.panel.component";
export * from "./admin.view.book.component";
export * from "./admin.add.books.component";
export * from "./admin.view.member.component";
export * from "./admin.view.all.purchase.book.component";
