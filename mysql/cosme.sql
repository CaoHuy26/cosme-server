CREATE TABLE `brand` (
  `id` VARCHAR(45) PRIMARY KEY,
  `manufacturerId` VARCHAR(45),
  `brandName` VARCHAR(45) NOT NULL,
  `origin` VARCHAR(45),
  `createdAt` DATETIME,
  `updatedAt` DATETIME
);

CREATE TABLE `category` (
  `id` VARCHAR(45) PRIMARY KEY,
  `en_name` VARCHAR(45) NOT NULL,
  `vn_name` VARCHAR(45) NOT NULL,
  `imageUrl` VARCHAR(45),
  `createdAt` DATETIME,
  `updatedAt` DATETIME
);

CREATE TABLE `manufacturer` (
  `id` VARCHAR(45) PRIMARY KEY,
  `name` VARCHAR(45) NOT NULL,
  `location` VARCHAR(45),
  `createdAt` DATETIME,
  `updatedAt` DATETIME
);

CREATE TABLE `order` (
  `id` VARCHAR(45) PRIMARY KEY,
  `userId` VARCHAR(45),
  `orderStatusId` VARCHAR(45),
  `receiverName` VARCHAR(45) NOT NULL,
  `receiverPhone` VARCHAR(45) NOT NULL,
  `shippingAddress` VARCHAR(45) NOT NULL,
  `shippingDate` DATETIME NOT NULL,
  `comment` VARCHAR(45),
  `totalDiscount` DECIMAL,
  `totalShipping` DECIMAL,
  `total` DECIMAL NOT NULL,
  `totalTax` DECIMAL,
  `createdAt` DATETIME,
  `updatedAt` DATETIME
);

CREATE TABLE `order_product` (
  `id` VARCHAR(45) PRIMARY KEY,
  `productId` VARCHAR(45),
  `orderId` VARCHAR(45),
  `name` VARCHAR(45),
  `sku` VARCHAR(45),
  `price` DECIMAL,
  `priceWithTax` DECIMAL,
  `quantity` INT,
  `createdAt` DATETIME,
  `updatedAt` DATETIME
);

CREATE TABLE `order_status` (
  `id` VARCHAR(45) PRIMARY KEY,
  `status` TINYINT NOT NULL,
  `statusName` VARCHAR(45) NOT NULL,
  `notification` VARCHAR(45),
  `createdAt` DATETIME,
  `updatedAt` DATETIME
);

CREATE TABLE `order_status_history` (
  `id` VARCHAR(45) PRIMARY KEY,
  `orderId` VARCHAR(45),
  `orderStatusId` VARCHAR(45),
  `createdAt` DATETIME,
  `updatedAt` DATETIME
);

CREATE TABLE `permission` (
  `id` VARCHAR(45) PRIMARY KEY,
  `name` VARCHAR(45) NOT NULL,
  `createdAt` DATETIME,
  `updatedAt` DATETIME
);

CREATE TABLE `permission_role` (
  `id` VARCHAR(45) PRIMARY KEY,
  `roleId` VARCHAR(45),
  `permissionId` VARCHAR(45),
  `createdAt` VARCHAR(45),
  `updatedAt` VARCHAR(45)
);

CREATE TABLE `permission_user` (
  `id` VARCHAR(45) PRIMARY KEY,
  `permissionId` VARCHAR(45),
  `userId` VARCHAR(45),
  `createdAt` VARCHAR(45),
  `updatedAt` VARCHAR(45)
);

CREATE TABLE `product` (
  `id` VARCHAR(45) PRIMARY KEY,
  `categoryId` VARCHAR(45),
  `brandId` VARCHAR(45),
  `name` VARCHAR(45) NOT NULL,
  `sku` VARCHAR(45),
  `price` DECIMAL NOT NULL,
  `description` VARCHAR(45),
  `stock` VARCHAR(45) NOT NULL DEFAULT 1,
  `active` TINYINT NOT NULL,
  `createdAt` DATETIME,
  `updatedAt` DATETIME
);

CREATE TABLE `product_image` (
  `id` VARCHAR(45) PRIMARY KEY,
  `productId` VARCHAR(45),
  `image` VARCHAR(45) NOT NULL,
  `isThumbnail` TINYINT DEFAULT false,
  `createdAt` DATETIME,
  `updatedAt` DATETIME
);

CREATE TABLE `product_rating` (
  `id` VARCHAR(45) PRIMARY KEY,
  `productId` VARCHAR(45),
  `userId` VARCHAR(45),
  `rate` INT NOT NULL,
  `createdAt` DATETIME,
  `updatedAt` DATETIME
);

CREATE TABLE `product_review` (
  `id` VARCHAR(45) PRIMARY KEY,
  `productId` VARCHAR(45),
  `userId` VARCHAR(45),
  `review` VARCHAR(45) NOT NULL,
  `createdAt` DATETIME,
  `updatedAt` DATETIME
);

CREATE TABLE `role` (
  `id` VARCHAR(45) PRIMARY KEY,
  `name` VARCHAR(45) NOT NULL,
  `createdAt` DATETIME,
  `updatedAt` DATETIME
);

CREATE TABLE `role_user` (
  `id` VARCHAR(45) PRIMARY KEY,
  `roleId` VARCHAR(45),
  `userId` VARCHAR(45),
  `createdAt` DATETIME,
  `updatedAt` DATETIME
);

CREATE TABLE `user` (
  `id` VARCHAR(45) PRIMARY KEY,
  `email` VARCHAR(45) UNIQUE NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `type` INT NOT NULL DEFAULT 1,
  `active` TINYINT NOT NULL DEFAULT true,
  `createdAt` DATETIME,
  `updatedAt` DATETIME
);

CREATE TABLE `user_log` (
  `id` VARCHAR(45) PRIMARY KEY,
  `userId` VARCHAR(45),
  `ipAddress` VARCHAR(45),
  `deviceId` VARCHAR(45),
  `action` INT NOT NULL,
  `activedAt` DATETIME,
  `createdAt` DATETIME,
  `updatedAt` DATETIME
);

CREATE TABLE `user_photo` (
  `id` VARCHAR(45) PRIMARY KEY,
  `userId` VARCHAR(45),
  `image` VARCHAR(45) NOT NULL,
  `createdAt` DATETIME,
  `updatedAt` DATETIME
);

CREATE TABLE `user_profile` (
  `id` VARCHAR(45) PRIMARY KEY,
  `userId` VARCHAR(45),
  `username` VARCHAR(45),
  `phone` VARCHAR(45),
  `dob` DATETIME,
  `country` VARCHAR(45),
  `address` VARCHAR(45),
  `createdAt` DATETIME,
  `updatedAt` DATETIME
);

ALTER TABLE `brand` ADD FOREIGN KEY (`manufacturerId`) REFERENCES `manufacturer` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`orderStatusId`) REFERENCES `order_status` (`id`);

ALTER TABLE `order_product` ADD FOREIGN KEY (`productId`) REFERENCES `product` (`id`);

ALTER TABLE `order_product` ADD FOREIGN KEY (`orderId`) REFERENCES `order` (`id`);

ALTER TABLE `order_status_history` ADD FOREIGN KEY (`orderId`) REFERENCES `order` (`id`);

ALTER TABLE `order_status_history` ADD FOREIGN KEY (`orderStatusId`) REFERENCES `order_status` (`id`);

ALTER TABLE `permission_role` ADD FOREIGN KEY (`roleId`) REFERENCES `role` (`id`);

ALTER TABLE `permission_role` ADD FOREIGN KEY (`permissionId`) REFERENCES `permission` (`id`);

ALTER TABLE `permission_user` ADD FOREIGN KEY (`permissionId`) REFERENCES `permission` (`id`);

ALTER TABLE `permission_user` ADD FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

ALTER TABLE `product` ADD FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`);

ALTER TABLE `product` ADD FOREIGN KEY (`brandId`) REFERENCES `brand` (`id`);

ALTER TABLE `product_image` ADD FOREIGN KEY (`productId`) REFERENCES `product` (`id`);

ALTER TABLE `product_rating` ADD FOREIGN KEY (`productId`) REFERENCES `product` (`id`);

ALTER TABLE `product_rating` ADD FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

ALTER TABLE `product_review` ADD FOREIGN KEY (`productId`) REFERENCES `product` (`id`);

ALTER TABLE `product_review` ADD FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

ALTER TABLE `role_user` ADD FOREIGN KEY (`roleId`) REFERENCES `role` (`id`);

ALTER TABLE `role_user` ADD FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

ALTER TABLE `user_log` ADD FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

ALTER TABLE `user_photo` ADD FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

ALTER TABLE `user_profile` ADD FOREIGN KEY (`userId`) REFERENCES `user` (`id`);
