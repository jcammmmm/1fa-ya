package com.jcflorezv.unfaya;

import java.awt.image.BufferedImage;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.imageio.ImageIO;
import javax.sound.sampled.Port;
import javax.xml.bind.DatatypeConverter;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.jcflorezv.unfaya.entities.Address;

public class App {
  private final static int SAMPLES_QTTY = 1000;
  private final static String APP_NAME = "1fa-ya";
  private final static String ID_AUTH_ENDPOINT = "unique-id-registration";
  private final static int PORT = 8080;
  public static void main(String... args) throws IOException, WriterException, NoSuchAlgorithmException {

    File masterFile = new File("master-file.txt");
    BufferedWriter writer = new BufferedWriter(new FileWriter(masterFile));
    for (int i = 0; i < SAMPLES_QTTY; i++) {
        // BufferedImage addr = generateQRCodeImage(new Address().toString());
        // File f = new File("qr_" + i + ".png");
        // ImageIO.write(addr, "png", f);
        Address addr = new Address();
        String addrSHA = getChecksum(addr);
        String row = String.format("%3d \t http://%s:%d/%s/%s \t%s \n", i, APP_NAME, PORT, ID_AUTH_ENDPOINT, addrSHA, addr);
        // writer.write(i + "\t" + "http://" + APP_NAME + ":" + PORT + "/" + ID_AUTH_ENDPOINT + "/" + addrSHA + "\t" + addr + "\n");
        writer.write(row);
    }
    writer.close();
  }

  public static BufferedImage generateQRCodeImage(String barcodeText) throws WriterException {
    QRCodeWriter barCodeWriter = new QRCodeWriter();
    BitMatrix bitMatrix = barCodeWriter.encode(barcodeText, BarcodeFormat.QR_CODE, 200, 200);
    return MatrixToImageWriter.toBufferedImage(bitMatrix);
  }

  /**
   *
   * @param object
   * @return
   * @author https://stackoverflow.com/users/4686555/leonardo-leit%c3%a3o
   * @throws IOException
   * @throws NoSuchAlgorithmException
   */
  public static String getChecksum(Serializable object) throws IOException, NoSuchAlgorithmException {
    ByteArrayOutputStream baos = null;
    ObjectOutputStream oos = null;
    try {
      baos = new ByteArrayOutputStream();
      oos = new ObjectOutputStream(baos);
      oos.writeObject(object);
      MessageDigest md = MessageDigest.getInstance("SHA");
      byte[] thedigest = md.digest(baos.toByteArray());
      return DatatypeConverter.printHexBinary(thedigest);
    } finally {
      oos.close();
      baos.close();
    }
  }

}
