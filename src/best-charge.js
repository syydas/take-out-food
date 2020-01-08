function bestCharge(selectedItems) {
  let ItemsList = getItemsList(selectedItems);
  let summary = hasDiscount(ItemsList);
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

/*function loadAllItems() {
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
}*/

let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
bestCharge(inputs);

function hasDiscount(ItemsList) {
  let summary = {};
  let totalPrice = ItemsList.reduce((price, item) => {
    return price + item.subTotalPrice;
  }, 0);
  summary.totalPrice = totalPrice;

  return summary;
}

function printTickets(ItemsList, summary) {
  let result = "============= 订餐明细 =============";
  return result;
}
