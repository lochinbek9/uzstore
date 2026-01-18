
/**
 * In a real application, these would be in environment variables.
 * For this demo, we use placeholder values.
 */
const TELEGRAM_BOT_TOKEN = "7528392183:AAH3m8M8R_L_W8jYF7-S0Q_T6fX-O0Z7S-Q"; // Placeholder
const TELEGRAM_CHAT_ID = "-4152739123"; // Placeholder

export const sendOrderToTelegram = async (orderData: {
  name: string;
  phone: string;
  items: any[];
  total: number;
}) => {
  const message = `
🚀 *Yangi Buyurtma!*
👤 *Mijoz:* ${orderData.name}
📞 *Tel:* ${orderData.phone}
💰 *Jami:* ${orderData.total.toLocaleString()} so'm

🛒 *Mahsulotlar:*
${orderData.items.map(item => `• ${item.name} (${item.quantity} dona)`).join('\n')}
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });
    return response.ok;
  } catch (error) {
    console.error("Telegram send error:", error);
    return false;
  }
};
