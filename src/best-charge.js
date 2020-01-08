function bestCharge(selectedItems) {
  let itemsList = getItemsList(selectedItems);
  let summary = hasDiscount(itemsList);
  console.log(summary);
  //let result = printTickets(ItemsList, summary);
  //return result;
  return /*TODO*/;
}

function getItemsList(selectedItems) {
  const allItems = loadAllItems();
  const selectedItemsId = selectedItems.map(item => item.split(" x ")[0]);
  const selectedItemsCount = selectedItems.map(item => item.split(" x ")[1]);
  const ItemsList = selectedItemsId.map((itemId, index) => {
    const choosedItem = allItems.find(item => item.id === itemId);
    choosedItem.count = selectedItemsCount[index];
    choosedItem.subTotalPrice = choosedItem.price * choosedItem.count;
    return choosedItem;
  });
  return ItemsList;
}

function loadAllItems() {
  return [
    {
      id: "ITEM0001",
      name: "黄焖鸡",
      price: 18.0
    },
    {
      id: "ITEM0013",
      name: "肉夹馍",
      price: 6.0
    },
    {
      id: "ITEM0022",
      name: "凉皮",
      price: 8.0
    },
    {
      id: "ITEM0030",
      name: "冰锋",
      price: 2.0
    }
  ];
}

function loadPromotions() {
  return [
    {
      type: "满30减6元"
    },
    {
      type: "指定菜品半价",
      items: ["ITEM0001", "ITEM0022"]
    }
  ];
}


let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
bestCharge(inputs);

function hasDiscount(itemsList) {
  let summary = {};
  let totalPrice = itemsList.reduce((price, item) => {
    return price + item.subTotalPrice;
  }, 0);
  let discountHalfItem = [];
  let halfPrice = 0;
  let promotions = loadPromotions();
  promotions[1].items.forEach(value => {
    itemsList.forEach(item => {
      if(item.id === value) {
        halfPrice += item.price / 2;
        discountHalfItem.push(item.name);
      }
    });
  });
  if (totalPrice < 30) {
    summary.discount = halfPrice ? halfPrice : "";
    summary.totalPrice = totalPrice - summary.discount;
    summary.type = halfPrice ? promotions[1].type : "";
  } else {
    summary.discount = Math.max(halfPrice, 6);
    summary.totalPrice = totalPrice - summary.discount;
    summary.type = 6 > halfPrice ? promotions[0].type :promotions[1].type;
  }
  return summary;
}

function printTickets(ItemsList, summary) {
  let result = "============= 订餐明细 =============";
  return result;
}
