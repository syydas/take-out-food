function bestCharge(selectedItems) {
  let itemsList = getItemsList(selectedItems);
  let summary = hasDiscount(itemsList);
  let result = printTickets(itemsList, summary);
  console.log(result);
  return result;
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
      if (item.id === value) {
        halfPrice += item.price / 2;
        discountHalfItem.push(item.name);
      }
    });
  });
  if (totalPrice < 30) {
    if (halfPrice) {
      summary.discount = halfPrice;
      summary.totalPrice = totalPrice - halfPrice;
      summary.type = promotions[1].type;
      summary.discountItem = discountHalfItem;
    } else {
      summary.totalPrice = totalPrice;
    }
  } else {
    summary.discount = Math.max(halfPrice, 6);
    summary.totalPrice = totalPrice - summary.discount;
    summary.type = 6 > halfPrice ? promotions[0].type : promotions[1].type;
    summary.discountItem = 6 > halfPrice ? "" : discountHalfItem;
  }
  return summary;
}

function printTickets(itemsList, summary) {
  let result = "============= 订餐明细 =============\n";
  itemsList.forEach(item => {
    return (result += `${item.name} x ${item.count} = ${item.subTotalPrice}元\n`);
  });
  result += "-----------------------------------\n";
  switch (summary.type) {
    case "满30减6元":
      result += `使用优惠:\n${summary.type}，省${summary.discount}元\n`;
      result += "-----------------------------------\n";
      break;
    case "指定菜品半价":
      result += `使用优惠:\n${summary.type}(${summary.discountItem.join(
        "，"
      )})，省${summary.discount}元\n`;
      result += "-----------------------------------\n";
      break;
    default:
      break;
  }

  result += `总计：${summary.totalPrice}元\n`;
  result += "===================================\n";
  return result;
}
