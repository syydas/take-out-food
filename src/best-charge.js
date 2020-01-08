function bestCharge(selectedItems) {
  let ItemsList = getItemsList(selectedItems);
  let summary = hasDiscount(ItemsList);
  let result = printTickets(ItemsList, summary);
  return result;
}

function getItemsList(selectedItems) {
  const allItems = loadAllItems();
  return ItemsList;
}

function hasDiscount(ItemsList) {
  let summary = {};
  return summary;
}

function printTickets(ItemsList, summary) {
  let result = '============= 订餐明细 =============';
  return result;
}
