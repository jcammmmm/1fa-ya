package com.jcflorezv.unfaya;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.jcflorezv.unfaya.entities.Address;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

public class App {
  public static void main(String... args) throws IOException, WriterException {
    String str = "Lets generate some identities!";
    for(int i = 0; i < 10; i++) {
      BufferedImage addr = generateQRCodeImage(new Address().toString());
      File f = new File("qr_" + i + ".png");
      ImageIO.write(addr, "png", f);
    }
  }

  public static BufferedImage generateQRCodeImage(String barcodeText) throws WriterException {
    QRCodeWriter barCodeWriter = new QRCodeWriter();
    BitMatrix bitMatrix = barCodeWriter.encode(barcodeText, BarcodeFormat.QR_CODE, 200, 200);
    return MatrixToImageWriter.toBufferedImage(bitMatrix);
  }
}
