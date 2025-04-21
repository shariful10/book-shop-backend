"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOrderInvoicePDF = void 0;
/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-explicit-any */
const pdfkit_1 = __importDefault(require("pdfkit"));
const axios_1 = __importDefault(require("axios"));
/**
 * Generates a PDF invoice for an order.
 * @param {IOrder} order - The order object to generate the invoice for.
 * @returns {Promise<Buffer>} - The generated PDF as a Buffer.
 */
const generateOrderInvoicePDF = (order) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const logoUrl = "https://res.cloudinary.com/dbgrq28js/image/upload/v1736763971/logoipsum-282_ilqjfb_paw4if.png";
            // Download the logo image as a buffer
            const response = yield axios_1.default.get(logoUrl, {
                responseType: "arraybuffer",
            });
            const logoBuffer = Buffer.from(response.data);
            const doc = new pdfkit_1.default({ margin: 50 });
            const buffers = [];
            doc.on("data", (chunk) => buffers.push(chunk));
            doc.on("end", () => resolve(Buffer.concat(buffers)));
            doc.on("error", (err) => reject(err));
            // Header with graphical design and logo
            const logoWidth = 70; // Set the desired width for the logo
            const logoX = (doc.page.width - logoWidth) / 2; // Center the logo
            doc.image(logoBuffer, logoX, doc.y, { width: logoWidth });
            doc.moveDown(6); // Move down after the logo
            doc
                .fontSize(20)
                .font("Helvetica-Bold")
                .fillColor("#000000")
                .text("NextMert", { align: "center" });
            doc
                .fontSize(10)
                .text("Level-4, 34, Awal Centre, Banani, Dhaka", { align: "center" });
            doc.fontSize(10).text("Email: support@nextmert.com", { align: "center" });
            doc.fontSize(10).text("Phone: + 06 223 456 678", { align: "center" });
            doc.moveDown(0.5);
            doc
                .fontSize(15)
                .font("Helvetica-Bold")
                .fillColor("#003366")
                .text("Invoice", { align: "center" });
            doc.lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke(); // Horizontal line under header
            doc.moveDown(0.5);
            // Invoice Details
            doc.moveDown(0.5);
            // doc.text(`Customer Name: ${order.user.name}`);
            doc.moveDown(1);
            // Payment Details with graphical design
            doc
                .fontSize(11)
                .font("Helvetica-Bold")
                .fillColor("#003366")
                .text("Payment Details:", { underline: true });
            doc.text(`Payment Status: ${order.paymentStatus}`);
            doc.text(`Payment Method: ${order.paymentMethod}`);
            doc.moveDown(1);
            // doc.lineWidth(0.5).moveTo(50, doc.y).lineTo(550, doc.y).stroke();  // Horizontal line
            // // Order Products in a table format
            // doc.moveDown(2);
            doc
                .fontSize(11)
                .font("Helvetica-Bold")
                .fillColor("#003366")
                .text("Order Products:", { underline: true });
            doc.moveDown(1);
            const tableTop = doc.y;
            const tableHeight = 20;
            // Table Headers for Products (Bold and Colored)
            doc
                .fontSize(11)
                .font("Helvetica-Bold")
                .fillColor("#003366")
                .text("Product Name", 50, tableTop);
            doc.text("Quantity", 300, tableTop);
            doc.text("Price", 450, tableTop);
            doc
                .lineWidth(0.5)
                .moveTo(50, tableTop + tableHeight)
                .lineTo(550, tableTop + tableHeight)
                .stroke(); // Table header line
            let currentY = tableTop + tableHeight + 5;
            // Order Products (Normal text, not bold)
            order.products.forEach((item) => {
                var _a;
                const productName = ((_a = item.product) === null || _a === void 0 ? void 0 : _a.name) || "Unknown Product";
                const quantity = item.quantity;
                const price = item.unitPrice * quantity || 0;
                doc
                    .fontSize(11)
                    .fillColor("#000000")
                    .text(productName, 50, currentY, { width: 130, align: "left" });
                doc.text(quantity.toString(), 280, currentY, {
                    width: 90,
                    align: "center",
                });
                doc.text(price.toFixed(2), 400, currentY, {
                    width: 90,
                    align: "right",
                });
                currentY += tableHeight;
            });
            // Final Table Border
            doc.lineWidth(0.5).moveTo(50, currentY).lineTo(550, currentY).stroke();
            doc.moveDown(2);
            const pricingTableTop = doc.y;
            // Table Headers for Pricing (Bold and Colored)
            doc
                .fontSize(11)
                .font("Helvetica-Bold")
                .fillColor("#003366")
                .text("Description", 50, pricingTableTop);
            doc.text("Amount", 450, pricingTableTop);
            doc
                .lineWidth(0.5)
                .moveTo(50, pricingTableTop + tableHeight)
                .lineTo(550, pricingTableTop + tableHeight)
                .stroke(); // Pricing header line
            let pricingY = pricingTableTop + tableHeight + 5;
            // Pricing Breakdown (Normal text, not bold)
            doc
                .fontSize(11)
                .fillColor("#000000")
                .text("Sub Total", 50, pricingY, { width: 200 });
            doc.text(`${order.totalAmount.toFixed(2)} /-`, 400, pricingY, {
                width: 90,
                align: "right",
            });
            pricingY += tableHeight;
            doc
                .fontSize(11)
                .fillColor("#000000")
                .text("Discount", 50, pricingY, { width: 200 });
            pricingY += tableHeight;
            doc
                .fontSize(11)
                .fillColor("#000000")
                .text("Delivery Charge", 50, pricingY, { width: 200 });
            pricingY += tableHeight;
            // Final Amount (Bold and Color)
            doc
                .fontSize(11)
                .font("Helvetica-Bold")
                .fillColor("#003366")
                .text("Total", 50, pricingY, { width: 200 });
            doc
                .fontSize(11)
                .font("Helvetica-Bold")
                .fillColor("#003366")
                .text(`${order.totalAmount.toFixed(2)} /-`, 400, pricingY, {
                width: 90,
                align: "right",
            });
            pricingY += tableHeight;
            // Final Pricing Table Border
            doc.lineWidth(0.5).moveTo(50, pricingY).lineTo(550, pricingY).stroke();
            doc.moveDown(3);
            doc.fontSize(9).text("Thank you for shopping!");
            doc
                .fontSize(9)
                .fillColor("#003366")
                .text("-NextMert", { align: "center" });
            // Finalize the document
            doc.end();
        }
        catch (err) {
            reject(err);
        }
    }));
});
exports.generateOrderInvoicePDF = generateOrderInvoicePDF;
