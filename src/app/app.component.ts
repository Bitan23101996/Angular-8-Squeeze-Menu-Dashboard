import { Component } from "@angular/core";
import { BroadcastService } from "./core/services/broadcast.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "dashboard";
  isMenuVisible: boolean = false;

  menuList: any = [
    {
      isSelect: false,
      createdBy: null,
      createdOn: null,
      maxLevel: 1,
      menuAction: "/dashboard",
      menuIconUrl: "fa fa-tachometer",
      menuId: 1,
      menuLevel: 0,
      menuTitle: "Dashboard",
      modifiedBy: null,
      modifiedOn: null,
      parentMenuId: 0,
      menuLists: null,
    },
    {
      isSelect: false,
      createdBy: null,
      createdOn: null,
      maxLevel: 1,
      menuAction: "/form",
      menuIconUrl: "fa fa-envelope",
      menuId: 2,
      menuLevel: 0,
      menuTitle: "Form",
      modifiedBy: null,
      modifiedOn: null,
      parentMenuId: 0,
      menuLists: null,
    },
    {
      isSelect: false,
      createdBy: null,
      createdOn: null,
      maxLevel: 1,
      menuAction: null,
      menuIconUrl: "fa fa-user-md",
      menuId: 3,
      menuLevel: 0,
      menuTitle: "Chart",
      modifiedBy: null,
      modifiedOn: null,
      parentMenuId: 0,
      menuLists: [
        {
          isSelect: false,
          createdBy: null,
          createdOn: null,
          maxLevel: 1,
          menuAction: "/submenu",
          menuIconUrl: null,
          menuId: 10,
          menuLevel: 1,
          menuLists: null,
          menuTitle: "Submenu 1",
          modifiedBy: null,
          modifiedOn: null,
          parentMenuId: 3,
        },
      ],
    },

    /* {
      active: false,
      createdBy: null,
      createdOn: null,
      maxLevel: 1,
      menuAction: null,
      menuIconUrl: "fa fa-envelope",
      menuId: 13,
      menuLevel: 0,
      menuTitle: "Menu 1",
      modifiedBy: null,
      modifiedOn: null,
      parentMenuId: 0,
      menuLists: [
        {
          active: false,
          createdBy: null,
          createdOn: null,
          maxLevel: 1,
          menuAction: null,
          menuIconUrl: null,
          menuId: 18,
          menuLevel: 1,
          menuLists: [
            {
              active: false,
              createdBy: null,
              createdOn: null,
              maxLevel: 1,
              menuAction: null,
              menuIconUrl: "fa fa-envelope",
              menuId: 13,
              menuLevel: 0,
              menuTitle: "Menu 1",
              modifiedBy: null,
              modifiedOn: null,
              parentMenuId: 0,
              menuLists: [
                {
                  active: false,
                  createdBy: null,
                  createdOn: null,
                  maxLevel: 1,
                  menuAction: null,
                  menuIconUrl: null,
                  menuId: 18,
                  menuLevel: 1,
                  menuLists: null,
                  menuTitle: "Submenu 1",
                  modifiedBy: null,
                  modifiedOn: null,
                  parentMenuId: 13,
                },
              ],
            },
          ],
          menuTitle: "Submenu 1",
          modifiedBy: null,
          modifiedOn: null,
          parentMenuId: 13,
        },
      ],
    }, */
  ];

  constructor(private _broadcastService: BroadcastService) {
    this._broadcastService.getMenuVisiblity().subscribe((returnedValue) => {
      this.isMenuVisible = returnedValue;
    });
  }
  //Click bar icon to show/hide sidebar menu
  toggleSidebar() {
    this.isMenuVisible = !this.isMenuVisible;
    this._broadcastService.setMenuVisiblity(this.isMenuVisible);

   /*  var els = document.querySelectorAll(".nav-item.isSelect");
    for (var i = 0; i < els.length; i++) {
      els[i].classList.remove("isSelect");
    } */

    if (this.menuList.length > 0) {
      for (let i = 0; i < this.menuList.length; i++) {
        if (this.menuList[i].isSelect) {
          this.menuList[i].isSelect = false;
        }
      }
    }
    // console.log("Menu Open:", this.isMenuVisible);
  }

  //Click level 1 menu
  toggleMenu(index: number) {
    this.menuList
      .filter((menu, i) => i !== index && menu.isSelect)
      .forEach((menu) => (menu.isSelect = !menu.isSelect));
    // console.log(this.menuList[index].isSelect);

    if (this.menuList[index].menuLists != null) {
      this.menuList[index].isSelect = !this.menuList[index].isSelect;
    }

    this.isMenuVisible = true;
    this._broadcastService.setMenuVisiblity(this.isMenuVisible);
        
  }

  //click level 2 menu
  toggleSubMenu(menuIndex: number, subMenuIndex: number) {
    this.menuList[menuIndex].menuLists
      .filter((submenu, j) => j !== subMenuIndex && submenu.isSelect)
      .forEach((submenu) => (submenu.isSelect = !submenu.isSelect));
    this.menuList[menuIndex].menuLists[subMenuIndex].isSelect = !this.menuList[
      menuIndex
    ].menuLists[subMenuIndex].isSelect;

    for (let menu of this.menuList) {
      if (
        menu.menuId != this.menuList[menuIndex].menuId &&
        menu.menuLists != null
      ) {
        for (let submenu of menu.menuLists) {
          submenu.isSelect = false;
        }
      }
    }
  }

  //Click Level 3 menu
  toggleChildSubMenu(
    menuIndex: number,
    subMenuIndex: number,
    childSubMenuIndex: number
  ) {
    console.log(menuIndex);
    //console.log("ARrray:::::", this.menuList[menuIndex].menuLists[subMenuIndex].menuLists);
    if (this.menuList[menuIndex].menuLists[subMenuIndex].menuLists != null) {
      for (let childSubMenus of this.menuList[menuIndex].menuLists[subMenuIndex]
        .menuLists) {
        childSubMenus.isSelect = false;
      }
      this.menuList[menuIndex].menuLists[subMenuIndex].menuLists.find(
        (childSubMenu) => childSubMenu.menuId == childSubMenuIndex
      ).isSelect = true;
    }
  }
}
