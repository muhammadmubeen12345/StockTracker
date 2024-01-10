import { getCurrentStock } from "./stockHandler";

async function runTests(): Promise<void> {
  try {
    const result1 = await getCurrentStock("KED089097/68/09");
    console.log(result1);

    const result2 = await getCurrentStock("notfffff123");
    console.log(result2);
  } catch (error) {
    console.log(error);
  }
}

runTests();
