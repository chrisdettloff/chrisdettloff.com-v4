---
title: 'RSP5 NVMe Boot Setup Guide'
description: 'Guide on setting up a RSP5 to boot from an NVMe SSD drive from a PI HAT.'
pubDate: 'July 31 2025'
---

This guide explains how to configure a Raspberry Pi 5 to boot from an NVMe drive without an SD card, enable PCIe Gen 3 for improved performance, test the setup, and disable Wi-Fi and Bluetooth. It assumes you're starting with Raspberry Pi OS Lite on an SD card, have an NVMe HAT installed, and the NVMe drive is detected (check with `lsblk` to see `/dev/nvme0n1`). 

## Prerequisites
- Raspberry Pi 5 with NVMe HAT and NVMe drive installed.
- Raspberry Pi OS Lite booted from an SD card.
- Command-line access (via SSH or console).
- Internet connection for updates.
- Git installed.

## Equipment
- [Raspberry Pi 5 PoE and NVMe HAT](https://www.amazon.com/dp/B0D8JC3MXQ?ref=ppx_yo2ov_dt_b_fed_asin_title&tag=cydneymarlene-20)
- [Crucial P3 500GB PCIe Gen3 NVMe](https://www.amazon.com/dp/B0B25LQQPC?ref=ppx_yo2ov_dt_b_fed_asin_title&tag=cydneymarlene-20&th=1)
- [Raspberry Pi 5 16 Gb](https://www.microcenter.com/product/688718/raspberry-pi-5)

## Step 1: Update System and Bootloader
Ensure the system and bootloader are up to date to support NVMe booting (requires firmware from December 2023 or later).

1. Update packages:
   ```bash
   sudo apt update && sudo apt full-upgrade
   ```

2. Check bootloader version:
   ```bash
   sudo rpi-eeprom-update
   ```

3. If the bootloader date is before December 6, 2023:
   - Open `raspi-config`:
     ```bash
     sudo raspi-config
     ```
   - Navigate to **Advanced Options** > **Bootloader Version** > Select **Latest**.
   - Exit with **Finish** (or Esc).
   - Apply the update:
     ```bash
     sudo rpi-eeprom-update -a
     sudo reboot
     ```

## Step 2: Clone SD Card OS to NVMe Drive
Use `rpi-clone` to copy the SD card's boot and root partitions to the NVMe drive.

1. Install `rpi-clone` (using a fork with NVMe support):
   ```bash
   git clone https://github.com/geerlingguy/rpi-clone.git
   cd rpi-clone
   sudo cp rpi-clone rpi-clone-setup /usr/local/sbin
   ```

2. Confirm NVMe device (e.g., `/dev/nvme0n1` with `lsblk`). If the NVMe has unwanted data, wipe it (optional):
   ```bash
   sudo umount /dev/nvme0n1p*  # Unmount any partitions
   sudo wipefs --all --force /dev/nvme0n1p*
   sudo wipefs --all --force /dev/nvme0n1
   sudo dd if=/dev/zero of=/dev/nvme0n1 bs=1024 count=1
   ```

3. Clone the SD card to NVMe:
   ```bash
   sudo rpi-clone nvme0n1
   ```
   - Follow prompts to confirm.
   - This copies partitions, updates UUIDs in `/etc/fstab` and `/boot/firmware/cmdline.txt`, and resizes the filesystem.

4. Reboot to verify (with SD card still inserted):
   ```bash
   sudo reboot
   ```

## Step 3: Set Boot Order to Prioritize NVMe
Configure the Pi to boot from NVMe, allowing SD card removal.

1. Open `raspi-config`:
   ```bash
   sudo raspi-config
   ```

2. Navigate to **Advanced Options** > **Boot Order** > Select **NVMe/USB boot** (sets `BOOT_ORDER=0xf64` for NVMe first, USB second, with retry).
3. Exit with **Finish** (or Esc).
4. Reboot:
   ```bash
   sudo reboot
   ```

5. Verify boot order (optional):
   ```bash
   vcgencmd bootloader_config | grep BOOT_ORDER
   ```
   - Should show `BOOT_ORDER=0xf64`.

## Step 4: Test Booting Without SD Card
1. Shut down:
   ```bash
   sudo shutdown now
   ```

2. Remove power, remove the SD card, and reconnect power.
3. The Pi should boot from the NVMe drive. If it fails, reinsert the SD card, boot, and recheck boot order or NVMe detection (`lsblk`).

## Step 5: Enable PCIe Gen 3
Enable PCIe Gen 3 for faster NVMe performance (if supported by your drive and HAT).

1. Edit the boot configuration:
   ```bash
   sudo vim.tiny /boot/firmware/config.txt
   ```
   - Press `i` to enter insert mode, add the line below under `[all]`:
     ```
     dtparam=pciex1_gen=3
     ```
   - Save and exit: Press `Esc`, then type `:wq` and press `Enter`.

2. Reboot:
   ```bash
   sudo reboot
   ```

## Step 6: Test PCIe Gen 3 and NVMe Performance
Verify PCIe Gen 3 is active and benchmark NVMe performance.

### Verify PCIe Gen 3
1. Install `pciutils`:
   ```bash
   sudo apt install pciutils
   ```

2. Check PCIe link speed:
   ```bash
   sudo lspci -vv | grep -E 'LnkSta:|LnkCap:'
   ```
   - Look for `LnkSta: Speed 8GT/s` (Gen 3). If it shows `5GT/s`, Gen 3 failed (see troubleshooting).
   - For NVMe-specific output:
     ```bash
     sudo lspci -vv | grep -i nvme -A 10
     ```

### Benchmark NVMe Performance
1. Install `fio`:
   ```bash
   sudo apt install fio
   ```

2. Run sequential read/write tests:
   ```bash
   fio --name=write --filename=/home/pi/testfile --size=1G --rw=write --bs=1M --numjobs=1 --iodepth=1 --runtime=60 --time_based --group_reporting --ioengine=libaio
   fio --name=read --filename=/home/pi/testfile --size=1G --rw=read --bs=1M --numjobs=1 --iodepth=1 --runtime=60 --time_based --group_reporting --ioengine=libaio
   ```
   - Expect ~700-900 MB/s for Gen 3 vs. ~350-500 MB/s for Gen 2.

3. Clean up:
   ```bash
   rm /home/pi/testfile
   ```

4. Alternative quick test with `dd` (Optional):
   ```bash
   sync; dd if=/dev/zero of=/home/pi/testfile bs=1M count=1024; sync
   sync; dd if=/home/pi/testfile of=/dev/null bs=1M; sync
   rm /home/pi/testfile
   ```

## Step 7: Disable Wi-Fi and Bluetooth
I will be powering these devices with PoE so WiFi and Bluetooth will be unnecessary for my use case.

1. Edit the boot configuration:
   ```bash
   sudo vim.tiny /boot/firmware/config.txt
   ```
   - Press `i` to enter insert mode, add the lines below under `[all]`:
     ```
     dtoverlay=disable-wifi
     dtoverlay=disable-bt
     ```
   - Save and exit: Press `Esc`, then type `:wq` and press `Enter`.

2. Reboot:
   ```bash
   sudo reboot
   ```

3. Verify Wi-Fi and Bluetooth are disabled:
   ```bash
   rfkill list
   ```
   - No Wi-Fi (`wlan`) or Bluetooth devices should appear.

## Step 8: Clean Up rpi-clone
Remove `rpi-clone` and its files to free up space.

1. Remove executables:
   ```bash
   sudo rm /usr/local/sbin/rpi-clone
   sudo rm /usr/local/sbin/rpi-clone-setup
   ```

2. Remove the cloned repository:
   ```bash
   cd ~
   rm -rf rpi-clone
   ```

3. Clean up package cache (optional):
   ```bash
   sudo apt autoremove
   sudo apt autoclean
   ```

## Troubleshooting
- **NVMe Not Detected**:
  - Check HAT connections and ensure PCIe is enabled (`dtparam=pciex1` in `/boot/firmware/config.txt`).
  - Update firmware: `sudo rpi-eeprom-update -a`.
- **PCIe Gen 3 Not Active**:
  - Revert to Gen 2 by removing `dtparam=pciex1_gen=3`.
  - Check drive/HAT compatibility.
- **Boot Failure**:
  - Reinsert SD card, boot, and verify `/etc/fstab` and `/boot/firmware/cmdline.txt` UUIDs (`blkid` to check).
- **Performance Issues**:
  - Confirm drive specs and check for background processes (`top` or `htop`).

## Notes
- **Time**: Setup takes ~30-60 minutes, including cloning and testing.
- **Risks**: PCIe Gen 3 may be unstable with some drives/HATs; revert if needed.