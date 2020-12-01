import asyncHandler from "express-async-handler";
import Orders from "../models/orderModel.js";
import Users from "../models/userModel.js";

// @desc Create new order
// @route POST /api/orders
// @access private

const addOrderItem = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new Orders({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(200).json(createdOrder);
  }
});

// @desc Get order by id
// @route GET /api/orders/:id
// @access private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Orders.findById(req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

// @desc UPDATE order to pay
// @route PUT /api/orders/:id/pay
// @access private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Orders.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

// @desc GET logged in user orders
// @route PUT /api/orders/myorders
// @access private

const getMyOrders = asyncHandler(async (req, res) => {
  const order = await Orders.find({ user: req.user._id });

  res.json(order);
});

// @desc GET all orders
// @route GET /api/orders
// @access private/Admin

const getOrders = asyncHandler(async (req, res) => {
  try {
    const order = await Orders.find({});
    res.json(order);
  } catch (error) {
    throw new Error(error.message);
  }
});

// @desc UPDATE order to delivered
// @route PUT /api/orders/:id/deliver
// @access private/Admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Orders.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

export {
  addOrderItem,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
};
