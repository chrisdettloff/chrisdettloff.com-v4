---
title: 'Unraid is Damn Good'
description: ''
pubDate: 'Feb 8 2025'
---

### Backstory

The itch to self host started scratching me like crazy. I wanted a way to backup my photographs locally, host a media server, and just have a lab to spin up docker containers. Around a year ago I began down the YouTube rabbit hole of homelab videos. I was HOOKED!

I had this old gaming PC laying around, collecting dust. Before I knew of any hypervisors or NAS based OS's such as ProxMox, TrueNAS, and Unraid, I had loaded up Ubuntu server onto my system. I installed docker and spun up a Jellyfin container. I loaded some old media I had onto on my disks and was watching a movie on my computer that was being hosted locally on my server. Again, I was HOOKED!

### Server parts

After doing more research on operating system such as the ones mentioned above, I decided to build a NAS. Below are the parts I used:

| Type             | Item                                                                                                                                                                                                                      |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **CPU**          | [Intel Core i5-12600K 3.7 GHz 10-Core Processor](https://pcpartpicker.com/product/BB4Ycf/intel-core-i5-12600k-37-ghz-6-core-processor-bx8071512600k)                                                                      |
| **CPU Cooler**   | [Noctua NH-L9i-17xx chromax.black 33.84 CFM CPU Cooler](https://pcpartpicker.com/product/nJqPxr/noctua-nh-l9i-17xx-chromaxblack-3384-cfm-cpu-cooler-nh-l9i-17xx-chromaxblack)                                             |
| **Motherboard**  | [ASRock Z690M-ITX/ax Mini ITX LGA1700 Motherboard](https://pcpartpicker.com/product/2PYmP6/asrock-z690m-itxax-mini-itx-lga1700-motherboard-z690m-itxax)                                                                   |
| **Memory**       | [G.Skill Ripjaws V 32 GB (2 x 16 GB) DDR4-3200 CL16 Memory](https://pcpartpicker.com/product/kXbkcf/gskill-ripjaws-v-32-gb-2-x-16-gb-ddr4-3200-cl16-memory-f4-3200c16d-32gvk)                                             |
| **Storage**      | [TEAMGROUP MP44 1 TB M.2-2280 PCIe 4.0 X4 NVME Solid State Drive](https://pcpartpicker.com/product/wXkH99/teamgroup-mp44-1-tb-m2-2280-pcie-40-x4-nvme-solid-state-drive-tm8fpw001t0c101)                                  |
| **Storage**      | [TEAMGROUP MP44 1 TB M.2-2280 PCIe 4.0 X4 NVME Solid State Drive](https://pcpartpicker.com/product/wXkH99/teamgroup-mp44-1-tb-m2-2280-pcie-40-x4-nvme-solid-state-drive-tm8fpw001t0c101)                                  |
| **Storage**      | [Western Digital Red Plus 12 TB 3.5" 7200 RPM Internal Hard Drive](https://pcpartpicker.com/product/CK2WGX/western-digital-wd-red-plus-12-tb-35-7200rpm-internal-hard-drive-wd120efbx)                                    |
| **Storage**      | [Western Digital Red Plus 12 TB 3.5" 7200 RPM Internal Hard Drive](https://pcpartpicker.com/product/CK2WGX/western-digital-wd-red-plus-12-tb-35-7200rpm-internal-hard-drive-wd120efbx)                                    |
| **Case**         | [Jonsbo N3 Mini ITX Desktop Case](https://pcpartpicker.com/product/Rf26Mp/jonsbo-n3-mini-itx-desktop-case-n3)                                                                                                             |
| **Power Supply** | [SeaSonic FOCUS SGX (2021) 650 W 80+ Gold Certified Fully Modular SFX Power Supply](https://pcpartpicker.com/product/PkZ9TW/seasonic-focus-sgx-2021-650-w-80-gold-certified-fully-modular-sfx-power-supply-focus-sgx-650) |

My configuration is for the small form factor case of the Jonsbo N3. It have duel NVMe 1TB drives for my cache running in mirror and dual 12TB WD Reds, one running as the parity drive.

### To TrueNAS or to Unraid?

Originally I was going to install TrueNAS. It being FOSS was a huge reason why. Unfortunately, I had issues installing and getting it running on my hardware. TrueNAS struggled with my motherboard's drivers, which caused it to be unsupported. Thus, I pivoted to Unraid.

Now I wasn't the biggest fan of the license model, also at the time they had just reworked their licensing and their starter license was now more expensive. But, after spending close to a year with it, I can say it is worth that price and more.

### Personal Experience

Setting up the Unraid server was quite simple. Load Unraid onto a thumb drive and boot from the thumb drive in the BIOS. The WebUI is very organized and clean, especially with the recent release of Unraid 7.

Some other really big draws to Unraid are the btrfs filesystem, allowing for the combination of any drive sizes to be added to your array. The community app store, allowing the easy configuration and installation of your favorite applications running in docker containers, and their really errorless upgrades. I recently went from Unraid 6.12 to 7 without zero issues.

### Conclusion

After nearly a year of using Unraid, I can confidently say that the blend of ease-of-use, technical depth, and community support makes it a worthwhile investment—even if the license isn’t free. 

Whether you’re a beginner looking to dip your toes into self-hosting or looking fore a more flexible, manageable NAS solution, Unraid offers a great balance of functionality and simplicity that’s hard to beat.

