import { promises as fsPromises } from "fs";
import { dirname, join } from "path";

interface StockEntry {
  sku: string;
  stock: number;
}

interface Transaction {
  sku: string;
  type: string;
  qty: number;
}

async function readJsonFile<T>(filename: string): Promise<T> {
  const absolutePath = join(dirname(__filename), filename);
  const data = await fsPromises.readFile(absolutePath, "utf-8");
  return JSON.parse(data);
}

async function getCurrentStock(
  sku: string,
): Promise<{ sku: string; qty: number }> {
  const stockData: StockEntry[] = await readJsonFile("../data/stock.json");
  const transactionsData: Transaction[] = await readJsonFile(
    "../data/transactions.json",
  );

  // Check if SKU exists in stockData
  const stockEntry = stockData.find((entry) => entry.sku === sku);
  if (!stockEntry) {
    throw new Error(`SKU ${sku} not found in stock.json`);
  }

  // Check if SKU exists in transactionsData
  const transactionsForSku = transactionsData.filter(
    (transaction) => transaction.sku === sku,
  );
  if (transactionsForSku.length === 0) {
    throw new Error(`SKU ${sku} not found in transactions.json`);
  }

  // Calculate totalQty as before
  const totalQty = transactionsForSku.reduce(
    (accumulator, transaction) =>
      transaction.type === "order"
        ? accumulator + transaction.qty
        : accumulator - transaction.qty,
    stockEntry.stock,
  );

  if (totalQty < 0) {
    throw new Error(`Invalid stock level for SKU ${sku}`);
  }

  return { sku, qty: totalQty };
}

export { getCurrentStock };
