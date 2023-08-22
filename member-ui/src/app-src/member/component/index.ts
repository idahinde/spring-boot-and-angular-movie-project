import {MemberLoginComponent} from "./member.login.component";
import {MemberRegisterComponent} from "./member.register.component";
import {MemberBasePageComponent} from "./member.base.page.component";
import {MemberViewBooksComponent} from "./member.view.books.component";
import {MemberBuyBookComponent} from "./member.buy.book.component";
import {MemberViewPurchaseBookComponent} from "./member.view.purchase.book.component";

export const memberComp: any[] = [
  MemberLoginComponent, MemberRegisterComponent,
  MemberBasePageComponent, MemberViewBooksComponent,
  MemberBuyBookComponent, MemberViewPurchaseBookComponent
]

export * from "./member.login.component";
export * from "./member.register.component";
export * from "./member.base.page.component";
export * from "./member.view.books.component";
export * from "./member.buy.book.component";
export * from "./member.view.purchase.book.component";
