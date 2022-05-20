"use strict";(self.webpackChunkfile_sync=self.webpackChunkfile_sync||[]).push([[4074],{4074:(pt,P,s)=>{s.r(P),s.d(P,{AuthenticationModule:()=>ut});var f=s(8583),c=s(4655),u=s(8239),r=s(3679),t=s(7716),_=s(8243),l=s(8295),h=s(9983),g=s(1095);function C(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Please enter a valid email address "),t.qZA())}function T(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Email is "),t.TgZ(2,"strong"),t._uU(3,"required"),t.qZA(),t.qZA())}function A(n,a){if(1&n&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&n){const o=t.oxw();t.xp6(1),t.hij(" ",null==o.formSignIn.controls.email.errors?null:o.formSignIn.controls.email.errors.auth," ")}}function q(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Password is "),t.TgZ(2,"strong"),t._uU(3,"required"),t.qZA(),t.qZA())}function b(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Password must be at least "),t.TgZ(2,"strong"),t._uU(3,"6 characters"),t.qZA(),t.qZA())}let I=(()=>{class n{constructor(o,e){this.auth=o,this.router=e,this.emailLocalStorage=localStorage.getItem("email"),this.formSignIn=new r.cw({email:new r.NI(this.emailLocalStorage,[r.kI.required,r.kI.email]),password:new r.NI("",[r.kI.required,r.kI.minLength(6)])})}signIn(){var o=this;const e=this.formSignIn.value,{email:i,password:p}=e;this.auth.signIn(i,p).then((0,u.Z)(function*(){yield o.router.navigateByUrl("/")})).catch(U=>{const d=this.auth.customErrorMessage(U.code);this.formSignIn.controls.email.setErrors({auth:d})})}signInWithPopUp(o){var e=this;this.auth.signInWithPopup(o).then((0,u.Z)(function*(){yield e.router.navigateByUrl("/")})).catch(i=>{console.error(i)})}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(_.$),t.Y36(c.F0))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-sign-in"]],decls:32,vars:7,consts:[[1,"container"],[1,"banner"],[1,"brand"],[1,"card"],[3,"formGroup","ngSubmit"],["src","./assets/icons/user.png","alt","user icon"],["appearance","fill"],["type","email","matInput","","formControlName","email","placeholder","Ex. pat@example.com"],[4,"ngIf"],["type","password","matInput","","formControlName","password","placeholder","Password"],[1,"submit"],["mat-raised-button","","color","primary",3,"disabled"],["routerLink","/authentication/sign-up"],["mat-stroked-button","","color","primary",3,"click"],["mat-stroked-button","","color","accent",3,"click"]],template:function(o,e){1&o&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.TgZ(3,"h1"),t._uU(4,"File-Sync"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(5,"div",3),t.TgZ(6,"form",4),t.NdJ("ngSubmit",function(){return(!e.formSignIn.controls.email.hasError("required")||e.formSignIn.controls.password.valid)&&e.signIn()}),t._UZ(7,"img",5),t.TgZ(8,"mat-form-field",6),t.TgZ(9,"mat-label"),t._uU(10,"Email"),t.qZA(),t._UZ(11,"input",7),t.YNc(12,C,2,0,"mat-error",8),t.YNc(13,T,4,0,"mat-error",8),t.YNc(14,A,2,1,"mat-error",8),t.qZA(),t.TgZ(15,"mat-form-field",6),t.TgZ(16,"mat-label"),t._uU(17,"Password"),t.qZA(),t._UZ(18,"input",9),t.YNc(19,q,4,0,"mat-error",8),t.YNc(20,b,4,0,"mat-error",8),t.qZA(),t.TgZ(21,"div",10),t.TgZ(22,"button",11),t._uU(23,"Sign-in "),t.qZA(),t.TgZ(24,"span"),t._uU(25,"No account ? Sign-up "),t.TgZ(26,"a",12),t._uU(27,"here"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(28,"button",13),t.NdJ("click",function(){return e.signInWithPopUp("google")}),t._uU(29,"Google sign-in"),t.qZA(),t.TgZ(30,"button",14),t.NdJ("click",function(){return e.signInWithPopUp("github")}),t._uU(31,"Github sign-in"),t.qZA(),t.qZA(),t.qZA()),2&o&&(t.xp6(6),t.Q6J("formGroup",e.formSignIn),t.xp6(6),t.Q6J("ngIf",e.formSignIn.controls.email.hasError("email")),t.xp6(1),t.Q6J("ngIf",e.formSignIn.controls.email.hasError("required")),t.xp6(1),t.Q6J("ngIf",null==e.formSignIn.controls.email.errors?null:e.formSignIn.controls.email.errors.auth),t.xp6(5),t.Q6J("ngIf",e.formSignIn.controls.password.hasError("required")),t.xp6(1),t.Q6J("ngIf",e.formSignIn.controls.password.hasError("minlength")),t.xp6(2),t.Q6J("disabled",e.formSignIn.controls.email.hasError("required")||!e.formSignIn.controls.password.valid))},directives:[r._Y,r.JL,r.sg,l.KE,l.hX,h.Nt,r.Fj,r.JJ,r.u,f.O5,g.lW,c.yS,l.TO],styles:[".container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;background:#F6F6F6;height:100vh}.container[_ngcontent-%COMP%]   .banner[_ngcontent-%COMP%]{width:100%;height:50vh;display:flex;justify-content:center;background:#3084FF}.container[_ngcontent-%COMP%]   .banner[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;padding:20px}.container[_ngcontent-%COMP%]   .banner[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{color:#fff;font-size:3rem;font-weight:bold}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;justify-content:center;align-content:center;padding:20px;background:#ffffff;border-radius:10px;width:600px;box-shadow:0 0 10px #0000001a}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:150px;margin-bottom:30px}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .submit[_ngcontent-%COMP%]{width:100%;display:flex;margin:20px 0;justify-content:space-between;align-items:center}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .submit[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#3084ff;font-weight:500}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .submit[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#3084ff;font-weight:600}@media (max-width: 768px){.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{width:80%}}"]}),n})();function x(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Full Name is "),t.TgZ(2,"strong"),t._uU(3,"required"),t.qZA(),t.qZA())}function y(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Full Name must be at least "),t.TgZ(2,"strong"),t._uU(3,"5"),t.qZA(),t._uU(4," characters long. "),t.qZA())}function M(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," last Name cannot be more than "),t.TgZ(2,"strong"),t._uU(3,"25"),t.qZA(),t._uU(4," characters long. "),t.qZA())}function N(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Please enter a valid email address "),t.qZA())}function O(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Email is "),t.TgZ(2,"strong"),t._uU(3,"required"),t.qZA(),t.qZA())}function S(n,a){if(1&n&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&n){const o=t.oxw();t.xp6(1),t.hij(" ",null==o.formSignUp.controls.email.errors?null:o.formSignUp.controls.email.errors.auth," ")}}function v(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Password is "),t.TgZ(2,"strong"),t._uU(3,"required"),t.qZA(),t.qZA())}function J(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Password must be at least "),t.TgZ(2,"strong"),t._uU(3,"6 characters"),t.qZA(),t.qZA())}function k(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Password cannot be more than "),t.TgZ(2,"strong"),t._uU(3,"25 characters"),t.qZA(),t.qZA())}let E=(()=>{class n{constructor(o,e){this.auth=o,this.router=e,this.formSignUp=new r.cw({displayName:new r.NI("",[r.kI.required,r.kI.minLength(5),r.kI.maxLength(25)]),email:new r.NI("",[r.kI.required,r.kI.email]),password:new r.NI("",[r.kI.required,r.kI.minLength(6),r.kI.maxLength(25)])})}signUp(){var o=this;const e=this.formSignUp.value,{displayName:i,email:p,password:U}=e,d={displayName:i,email:p,password:U,photoURL:null};this.auth.signUp(d).then((0,u.Z)(function*(){o.auth.signIn(d.email,d.password).then(()=>{o.router.navigateByUrl("/")}).catch(Z=>{const gt=o.auth.customErrorMessage(Z.code);o.formSignUp.controls.email.setErrors({auth:gt})})})).catch(Z=>{console.log(Z),this.formSignUp.controls.email.setErrors({auth:Z.error.message})})}signInWithPopUp(o){var e=this;this.auth.signInWithPopup(o).then((0,u.Z)(function*(){yield e.router.navigateByUrl("/")})).catch(i=>{console.error(i)})}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(_.$),t.Y36(c.F0))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-sign-up"]],decls:40,vars:11,consts:[[1,"container"],[1,"banner"],[1,"brand"],[1,"card"],[3,"formGroup","ngSubmit"],["src","./assets/icons/user.png","alt","user icon"],["appearance","fill"],["type","text","matInput","","formControlName","displayName","placeholder","Ex. Bob Razowski"],[4,"ngIf"],["type","email","matInput","","formControlName","email","placeholder","Ex. bob.razowski@example.com"],["type","password","matInput","","formControlName","password","placeholder","Password"],[1,"submit"],["mat-raised-button","","color","primary",3,"disabled"],["routerLink","/authentication/sign-in"],["mat-stroked-button","","color","primary",3,"click"],["mat-stroked-button","","color","accent",3,"click"]],template:function(o,e){1&o&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.TgZ(3,"h1"),t._uU(4,"File-Sync"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(5,"div",3),t.TgZ(6,"form",4),t.NdJ("ngSubmit",function(){return(!e.formSignUp.controls.email.hasError("required")||e.formSignUp.controls.password.valid||e.formSignUp.controls.displayName.valid)&&e.signUp()}),t._UZ(7,"img",5),t.TgZ(8,"mat-form-field",6),t.TgZ(9,"mat-label"),t._uU(10,"Full Name"),t.qZA(),t._UZ(11,"input",7),t.YNc(12,x,4,0,"mat-error",8),t.YNc(13,y,5,0,"mat-error",8),t.YNc(14,M,5,0,"mat-error",8),t.qZA(),t.TgZ(15,"mat-form-field",6),t.TgZ(16,"mat-label"),t._uU(17,"Email"),t.qZA(),t._UZ(18,"input",9),t.YNc(19,N,2,0,"mat-error",8),t.YNc(20,O,4,0,"mat-error",8),t.YNc(21,S,2,1,"mat-error",8),t.qZA(),t.TgZ(22,"mat-form-field",6),t.TgZ(23,"mat-label"),t._uU(24,"Password"),t.qZA(),t._UZ(25,"input",10),t.YNc(26,v,4,0,"mat-error",8),t.YNc(27,J,4,0,"mat-error",8),t.YNc(28,k,4,0,"mat-error",8),t.qZA(),t.TgZ(29,"div",11),t.TgZ(30,"button",12),t._uU(31,"Sign-up "),t.qZA(),t.TgZ(32,"span"),t._uU(33,"Already an account ? Sign-in "),t.TgZ(34,"a",13),t._uU(35,"here"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(36,"button",14),t.NdJ("click",function(){return e.signInWithPopUp("google")}),t._uU(37,"Google sign-in"),t.qZA(),t.TgZ(38,"button",15),t.NdJ("click",function(){return e.signInWithPopUp("github")}),t._uU(39,"Github sign-in"),t.qZA(),t.qZA(),t.qZA()),2&o&&(t.xp6(6),t.Q6J("formGroup",e.formSignUp),t.xp6(6),t.Q6J("ngIf",e.formSignUp.controls.displayName.hasError("required")),t.xp6(1),t.Q6J("ngIf",e.formSignUp.controls.displayName.hasError("minlength")),t.xp6(1),t.Q6J("ngIf",e.formSignUp.controls.displayName.hasError("maxlength")),t.xp6(5),t.Q6J("ngIf",e.formSignUp.controls.email.hasError("email")),t.xp6(1),t.Q6J("ngIf",e.formSignUp.controls.email.hasError("required")),t.xp6(1),t.Q6J("ngIf",null==e.formSignUp.controls.email.errors?null:e.formSignUp.controls.email.errors.auth),t.xp6(5),t.Q6J("ngIf",e.formSignUp.controls.password.hasError("required")),t.xp6(1),t.Q6J("ngIf",e.formSignUp.controls.password.hasError("minlength")),t.xp6(1),t.Q6J("ngIf",e.formSignUp.controls.password.hasError("maxlength")),t.xp6(2),t.Q6J("disabled",e.formSignUp.controls.email.hasError("required")||!e.formSignUp.controls.password.valid||!e.formSignUp.controls.displayName.valid))},directives:[r._Y,r.JL,r.sg,l.KE,l.hX,h.Nt,r.Fj,r.JJ,r.u,f.O5,g.lW,c.yS,l.TO],styles:[".container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;background:#F6F6F6;height:100vh}.container[_ngcontent-%COMP%]   .banner[_ngcontent-%COMP%]{width:100%;height:50vh;display:flex;justify-content:center;background:#3084FF}.container[_ngcontent-%COMP%]   .banner[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;padding:20px}.container[_ngcontent-%COMP%]   .banner[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{color:#fff;font-size:3rem;font-weight:bold}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;justify-content:center;align-content:center;padding:20px;background:#ffffff;border-radius:10px;width:600px;box-shadow:0 0 10px #0000001a}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:150px;margin-bottom:30px}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .submit[_ngcontent-%COMP%]{width:100%;display:flex;margin:20px 0;justify-content:space-between;align-items:center}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .submit[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#3084ff;font-weight:500}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .submit[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#3084ff;font-weight:600}@media (max-width: 768px){.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{width:80%}}"]}),n})();var m=s(2238),w=s(3137),Y=s(6345),F=s(6189);function Q(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Full Name is "),t.TgZ(2,"strong"),t._uU(3,"required"),t.qZA(),t.qZA())}function D(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Full Name must be at least "),t.TgZ(2,"strong"),t._uU(3,"5"),t.qZA(),t._uU(4," characters long. "),t.qZA())}function L(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," last Name cannot be more than "),t.TgZ(2,"strong"),t._uU(3,"25"),t.qZA(),t._uU(4," characters long. "),t.qZA())}function j(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Please enter a valid email address "),t.qZA())}function W(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Email is "),t.TgZ(2,"strong"),t._uU(3,"required"),t.qZA(),t.qZA())}function G(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Current Password is "),t.TgZ(2,"strong"),t._uU(3,"required"),t.qZA(),t.qZA())}function B(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Current Password must be at least "),t.TgZ(2,"strong"),t._uU(3,"6 characters"),t.qZA(),t.qZA())}function R(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Current Password cannot be more than "),t.TgZ(2,"strong"),t._uU(3,"25 characters"),t.qZA(),t.qZA())}function X(n,a){if(1&n&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&n){const o=t.oxw();t.xp6(1),t.hij(" ",null==o.formUpdatePassword.controls.password.errors?null:o.formUpdatePassword.controls.password.errors.auth," ")}}function z(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," New Password is "),t.TgZ(2,"strong"),t._uU(3,"required"),t.qZA(),t.qZA())}function V(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," New Password must be at least "),t.TgZ(2,"strong"),t._uU(3,"6 characters"),t.qZA(),t.qZA())}function $(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," New Password cannot be more than "),t.TgZ(2,"strong"),t._uU(3,"25 characters"),t.qZA(),t.qZA())}function H(n,a){if(1&n&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&n){const o=t.oxw();t.xp6(1),t.hij(" ",null==o.formUpdatePassword.controls.newPassword.errors?null:o.formUpdatePassword.controls.newPassword.errors.match," ")}}function K(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Confirm Password is "),t.TgZ(2,"strong"),t._uU(3,"required"),t.qZA(),t.qZA())}function tt(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Confirm Password must be at least "),t.TgZ(2,"strong"),t._uU(3,"6 characters"),t.qZA(),t.qZA())}function nt(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1," Confirm Password cannot be more than "),t.TgZ(2,"strong"),t._uU(3,"25 characters"),t.qZA(),t.qZA())}function et(n,a){if(1&n&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&n){const o=t.oxw();t.xp6(1),t.hij(" ",null==o.formUpdatePassword.controls.confirmNewPassword.errors?null:o.formUpdatePassword.controls.confirmNewPassword.errors.match," ")}}let ot=(()=>{class n{constructor(o,e,i){this.auth=o,this.dialog=e,this.snackbar=i,this.formUpdateProfile=new r.cw({displayName:new r.NI("",[r.kI.required,r.kI.minLength(5),r.kI.maxLength(25)]),email:new r.NI("",[r.kI.required,r.kI.email])}),this.formUpdatePassword=new r.cw({password:new r.NI("",[r.kI.required,r.kI.minLength(5),r.kI.maxLength(25)]),newPassword:new r.NI("",[r.kI.required,r.kI.minLength(5),r.kI.maxLength(25)]),confirmNewPassword:new r.NI("",[r.kI.required,r.kI.minLength(5),r.kI.maxLength(25)])})}ngOnInit(){var o=this;return(0,u.Z)(function*(){o.user=yield o.auth.getAuth(),o.formUpdateProfile.setValue({displayName:o.user.displayName,email:o.user.email})})()}updateProfile(){const o=this.formUpdateProfile.value;this.auth.updateUser({uid:this.user.uid,displayName:o.displayName,email:o.email,photoURL:this.user.photoURL}).subscribe(()=>{this.snackbar.displaySuccessMessage("Profile updated")})}updatePassword(){var o=this;return(0,u.Z)(function*(){const{password:e,newPassword:i,confirmNewPassword:p}=o.formUpdatePassword.value;if(i!==p)return o.formUpdatePassword.controls.newPassword.setErrors({match:"Passwords don't match"}),void o.formUpdatePassword.controls.confirmNewPassword.setErrors({match:"Passwords don't match"});e!==i||e!==p?o.auth.updatePassword(e,i).then(()=>{o.formUpdatePassword.reset(),o.snackbar.displaySuccessMessage("Your password has been updated")}).catch(()=>{o.formUpdatePassword.controls.password.setErrors({auth:"Wrong password"})}):o.formUpdatePassword.controls.newPassword.setErrors({match:"New password is the same as old password"})})()}deleteAccount(){this.dialog.open(rt)}deleteAllFiles(){this.dialog.open(at)}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(_.$),t.Y36(m.uw),t.Y36(w.o))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-user-profile"]],decls:70,vars:22,consts:[[1,"container"],[1,"element"],[1,"user"],["alt","",3,"src"],[3,"formGroup","ngSubmit"],[1,"card"],["appearance","fill"],["type","text","matInput","","formControlName","displayName","placeholder","Ex. Bob Razowski"],[4,"ngIf"],["mat-raised-button","","color","primary",1,"submit"],["type","email","matInput","","formControlName","email","placeholder","Ex. bob.razowski@example.com"],["type","password","matInput","","formControlName","password","placeholder","Password"],["type","password","matInput","","formControlName","newPassword","placeholder","Password"],["type","password","matInput","","formControlName","confirmNewPassword","placeholder","Password"],[1,"delete"],["mat-raised-button","","color","accent",3,"click"],["mat-raised-button","","color","warn",3,"click"]],template:function(o,e){1&o&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t._UZ(3,"img",3),t.TgZ(4,"h2"),t._uU(5),t.qZA(),t.TgZ(6,"h3"),t._uU(7),t.qZA(),t.qZA(),t.TgZ(8,"form",4),t.NdJ("ngSubmit",function(){return e.formUpdateProfile.valid&&e.updateProfile()}),t.TgZ(9,"div",5),t.TgZ(10,"h3"),t._uU(11,"Full Name"),t.qZA(),t.TgZ(12,"mat-form-field",6),t.TgZ(13,"mat-label"),t._uU(14,"Full Name"),t.qZA(),t._UZ(15,"input",7),t.YNc(16,Q,4,0,"mat-error",8),t.YNc(17,D,5,0,"mat-error",8),t.YNc(18,L,5,0,"mat-error",8),t.qZA(),t.TgZ(19,"button",9),t._uU(20,"Save"),t.qZA(),t.qZA(),t.TgZ(21,"div",5),t.TgZ(22,"h3"),t._uU(23,"Email"),t.qZA(),t.TgZ(24,"mat-form-field",6),t.TgZ(25,"mat-label"),t._uU(26,"Email"),t.qZA(),t._UZ(27,"input",10),t.YNc(28,j,2,0,"mat-error",8),t.YNc(29,W,4,0,"mat-error",8),t.qZA(),t.TgZ(30,"button",9),t._uU(31,"Save"),t.qZA(),t.qZA(),t.qZA(),t._UZ(32,"hr"),t.TgZ(33,"form",4),t.NdJ("ngSubmit",function(){return e.formUpdatePassword.valid&&e.updatePassword()}),t.TgZ(34,"div",5),t.TgZ(35,"h3"),t._uU(36,"Update password"),t.qZA(),t.TgZ(37,"mat-form-field",6),t.TgZ(38,"mat-label"),t._uU(39,"Current password"),t.qZA(),t._UZ(40,"input",11),t.YNc(41,G,4,0,"mat-error",8),t.YNc(42,B,4,0,"mat-error",8),t.YNc(43,R,4,0,"mat-error",8),t.YNc(44,X,2,1,"mat-error",8),t.qZA(),t.TgZ(45,"mat-form-field",6),t.TgZ(46,"mat-label"),t._uU(47,"New Password"),t.qZA(),t._UZ(48,"input",12),t.YNc(49,z,4,0,"mat-error",8),t.YNc(50,V,4,0,"mat-error",8),t.YNc(51,$,4,0,"mat-error",8),t.YNc(52,H,2,1,"mat-error",8),t.qZA(),t.TgZ(53,"mat-form-field",6),t.TgZ(54,"mat-label"),t._uU(55,"Confirm Password"),t.qZA(),t._UZ(56,"input",13),t.YNc(57,K,4,0,"mat-error",8),t.YNc(58,tt,4,0,"mat-error",8),t.YNc(59,nt,4,0,"mat-error",8),t.YNc(60,et,2,1,"mat-error",8),t.qZA(),t.TgZ(61,"button",9),t._uU(62,"Save"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(63,"div",14),t.TgZ(64,"button",15),t.NdJ("click",function(){return e.deleteAllFiles()}),t._uU(65,"Delete all files"),t.qZA(),t.qZA(),t.TgZ(66,"div",14),t.TgZ(67,"button",16),t.NdJ("click",function(){return e.deleteAccount()}),t._uU(68,"Delete my account"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t._UZ(69,"app-navbar")),2&o&&(t.xp6(3),t.Q6J("src",null!=e.user&&e.user.photoURL?null==e.user?null:e.user.photoURL:"./assets/icons/user.png",t.LSH),t.xp6(2),t.Oqu(null==e.user?null:e.user.displayName),t.xp6(2),t.Oqu(null==e.user?null:e.user.email),t.xp6(1),t.Q6J("formGroup",e.formUpdateProfile),t.xp6(8),t.Q6J("ngIf",e.formUpdateProfile.controls.displayName.hasError("required")),t.xp6(1),t.Q6J("ngIf",e.formUpdateProfile.controls.displayName.hasError("minlength")),t.xp6(1),t.Q6J("ngIf",e.formUpdateProfile.controls.displayName.hasError("maxlength")),t.xp6(10),t.Q6J("ngIf",e.formUpdateProfile.controls.email.hasError("email")),t.xp6(1),t.Q6J("ngIf",e.formUpdateProfile.controls.email.hasError("required")),t.xp6(4),t.Q6J("formGroup",e.formUpdatePassword),t.xp6(8),t.Q6J("ngIf",e.formUpdatePassword.controls.password.hasError("required")),t.xp6(1),t.Q6J("ngIf",e.formUpdatePassword.controls.password.hasError("minlength")),t.xp6(1),t.Q6J("ngIf",e.formUpdatePassword.controls.password.hasError("maxlength")),t.xp6(1),t.Q6J("ngIf",null==e.formUpdatePassword.controls.password.errors?null:e.formUpdatePassword.controls.password.errors.auth),t.xp6(5),t.Q6J("ngIf",e.formUpdatePassword.controls.newPassword.hasError("required")),t.xp6(1),t.Q6J("ngIf",e.formUpdatePassword.controls.newPassword.hasError("minlength")),t.xp6(1),t.Q6J("ngIf",e.formUpdatePassword.controls.newPassword.hasError("maxlength")),t.xp6(1),t.Q6J("ngIf",null==e.formUpdatePassword.controls.newPassword.errors?null:e.formUpdatePassword.controls.newPassword.errors.match),t.xp6(5),t.Q6J("ngIf",e.formUpdatePassword.controls.confirmNewPassword.hasError("required")),t.xp6(1),t.Q6J("ngIf",e.formUpdatePassword.controls.confirmNewPassword.hasError("minlength")),t.xp6(1),t.Q6J("ngIf",e.formUpdatePassword.controls.confirmNewPassword.hasError("maxlength")),t.xp6(1),t.Q6J("ngIf",null==e.formUpdatePassword.controls.confirmNewPassword.errors?null:e.formUpdatePassword.controls.confirmNewPassword.errors.match))},directives:[r._Y,r.JL,r.sg,l.KE,l.hX,h.Nt,r.Fj,r.JJ,r.u,f.O5,g.lW,Y.S,l.TO],styles:[".container[_ngcontent-%COMP%]{height:98%;overflow-y:auto;overflow-x:hidden}.container[_ngcontent-%COMP%]   .element[_ngcontent-%COMP%]{margin:50px 20px 0 250px}@media (max-width: 768px){.container[_ngcontent-%COMP%] > .element[_ngcontent-%COMP%]{margin:25px 20px 0 100px}}.user[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;margin-top:20px}.user[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:200px;height:200px;margin-bottom:20px;border-radius:50%}form[_ngcontent-%COMP%]{display:flex;justify-content:center;flex-direction:column;align-items:center;width:100%}form[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{display:flex;flex-direction:column;max-width:600px;width:100%}form[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .submit[_ngcontent-%COMP%]{margin:10px 0 30px}.delete[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;margin-top:20px}.delete[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:200px;height:50px;margin-bottom:20px}"]}),n})(),rt=(()=>{class n{constructor(o,e){this.auth=o,this.router=e}confirmDelete(){var o=this;this.auth.deleteUser().subscribe(()=>{this.auth.signOut().then((0,u.Z)(function*(){o.auth.user=null,localStorage.clear(),yield o.router.navigateByUrl("/authentication")}))})}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(_.$),t.Y36(c.F0))},n.\u0275cmp=t.Xpm({type:n,selectors:[["ng-component"]],decls:12,vars:2,consts:[["mat-dialog-title",""],[1,"mat-typography"],[1,"ion-justify-content-end"],["mat-button","",3,"mat-dialog-close"],["mat-button","","cdkFocusInitial","",3,"mat-dialog-close","click"]],template:function(o,e){1&o&&(t.TgZ(0,"h2",0),t._uU(1,"Delete account"),t.qZA(),t.TgZ(2,"mat-dialog-content",1),t.TgZ(3,"h3"),t._uU(4,"Do you really want to delete your account ?"),t.qZA(),t.TgZ(5,"p"),t._uU(6,"All your personal data will be deleted within 1 week at the latest"),t.qZA(),t.qZA(),t.TgZ(7,"mat-dialog-actions",2),t.TgZ(8,"button",3),t._uU(9,"Cancel"),t.qZA(),t.TgZ(10,"button",4),t.NdJ("click",function(){return e.confirmDelete()}),t._uU(11,"Delete"),t.qZA(),t.qZA()),2&o&&(t.xp6(8),t.Q6J("mat-dialog-close",!0),t.xp6(2),t.Q6J("mat-dialog-close",!0))},directives:[m.uh,m.xY,m.H8,g.lW,m.ZT],encapsulation:2}),n})(),at=(()=>{class n{constructor(o,e){this.fileService=o,this.snackbar=e}deleteAllFiles(){this.fileService.deleteAllFile().subscribe(o=>{this.snackbar.displaySuccessMessage(o.message),this.fileService.filesSubject.next([])})}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(F.I),t.Y36(w.o))},n.\u0275cmp=t.Xpm({type:n,selectors:[["ng-component"]],decls:10,vars:2,consts:[["mat-dialog-title",""],[1,"mat-typography"],[1,"ion-justify-content-end"],["mat-button","",3,"mat-dialog-close"],["mat-button","","cdkFocusInitial","",3,"mat-dialog-close","click"]],template:function(o,e){1&o&&(t.TgZ(0,"h2",0),t._uU(1,"Delete files"),t.qZA(),t.TgZ(2,"mat-dialog-content",1),t.TgZ(3,"h3"),t._uU(4,"Do you really want to delete all your files ?"),t.qZA(),t.qZA(),t.TgZ(5,"mat-dialog-actions",2),t.TgZ(6,"button",3),t._uU(7,"Cancel"),t.qZA(),t.TgZ(8,"button",4),t.NdJ("click",function(){return e.deleteAllFiles()}),t._uU(9,"Delete"),t.qZA(),t.qZA()),2&o&&(t.xp6(6),t.Q6J("mat-dialog-close",!0),t.xp6(2),t.Q6J("mat-dialog-close",!0))},directives:[m.uh,m.xY,m.H8,g.lW,m.ZT],encapsulation:2}),n})();const lt=[{path:"",component:(()=>{class n{constructor(){}}return n.\u0275fac=function(o){return new(o||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-authentication"]],decls:1,vars:0,template:function(o,e){1&o&&t._UZ(0,"router-outlet")},directives:[c.lC],styles:[""]}),n})(),children:[{path:"",component:I},{path:"sign-up",component:E},{path:"profile",component:ot,canActivate:[s(14).Q]},{path:"**",redirectTo:""}]}];let mt=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[c.Bz.forChild(lt)],c.Bz]}),n})();var ct=s(6176);let ut=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[f.ez,mt,l.lN,h.c,r.UX,g.ot,ct.W,m.Is]]}),n})()}}]);