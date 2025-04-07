import{R as t}from"./rom-B2LvkjpK.js";class i extends t{constructor(){super(...arguments),this.CHIP_NAME="ESP32-S3",this.IMAGE_CHIP_ID=9,this.EFUSE_BASE=1610641408,this.MAC_EFUSE_REG=this.EFUSE_BASE+68,this.EFUSE_BLOCK1_ADDR=this.EFUSE_BASE+68,this.EFUSE_BLOCK2_ADDR=this.EFUSE_BASE+92,this.UART_CLKDIV_REG=1610612756,this.UART_CLKDIV_MASK=1048575,this.UART_DATE_REG_ADDR=1610612864,this.FLASH_WRITE_SIZE=1024,this.BOOTLOADER_FLASH_OFFSET=0,this.FLASH_SIZES={"1MB":0,"2MB":16,"4MB":32,"8MB":48,"16MB":64},this.SPI_REG_BASE=1610620928,this.SPI_USR_OFFS=24,this.SPI_USR1_OFFS=28,this.SPI_USR2_OFFS=32,this.SPI_MOSI_DLEN_OFFS=36,this.SPI_MISO_DLEN_OFFS=40,this.SPI_W0_OFFS=88,this.USB_RAM_BLOCK=2048,this.UARTDEV_BUF_NO_USB=3,this.UARTDEV_BUF_NO=1070526796}async getChipDescription(t){const i=await this.getMajorChipVersion(t),s=await this.getMinorChipVersion(t);return`${{0:"ESP32-S3 (QFN56)",1:"ESP32-S3-PICO-1 (LGA56)"}[await this.getPkgVersion(t)]||"unknown ESP32-S3"} (revision v${i}.${s})`}async getPkgVersion(t){return await t.readReg(this.EFUSE_BLOCK1_ADDR+12)>>21&7}async getRawMinorChipVersion(t){return((await t.readReg(this.EFUSE_BLOCK1_ADDR+20)>>23&1)<<3)+(await t.readReg(this.EFUSE_BLOCK1_ADDR+12)>>18&7)}async getMinorChipVersion(t){const i=await this.getRawMinorChipVersion(t);return await this.isEco0(t,i)?0:this.getRawMinorChipVersion(t)}async getRawMajorChipVersion(t){return await t.readReg(this.EFUSE_BLOCK1_ADDR+20)>>24&3}async getMajorChipVersion(t){const i=await this.getRawMinorChipVersion(t);return await this.isEco0(t,i)?0:this.getRawMajorChipVersion(t)}async getBlkVersionMajor(t){return await t.readReg(this.EFUSE_BLOCK2_ADDR+16)>>0&3}async getBlkVersionMinor(t){return await t.readReg(this.EFUSE_BLOCK1_ADDR+12)>>24&7}async isEco0(t,i){return 0==(7&i)&&1===await this.getBlkVersionMajor(t)&&1===await this.getBlkVersionMinor(t)}async getFlashCap(t){const i=this.EFUSE_BASE+68+12;return await t.readReg(i)>>27&7}async getFlashVendor(t){const i=this.EFUSE_BASE+68+16;return{1:"XMC",2:"GD",3:"FM",4:"TT",5:"BY"}[await t.readReg(i)>>0&7]||""}async getPsramCap(t){const i=this.EFUSE_BASE+68+16;return await t.readReg(i)>>3&3}async getPsramVendor(t){const i=this.EFUSE_BASE+68+16;return{1:"AP_3v3",2:"AP_1v8"}[await t.readReg(i)>>7&3]||""}async getChipFeatures(t){const i=["Wi-Fi","BLE"],s=await this.getFlashCap(t),e=await this.getFlashVendor(t),a={0:null,1:"Embedded Flash 8MB",2:"Embedded Flash 4MB"}[s],r=void 0!==a?a:"Unknown Embedded Flash";null!==a&&i.push(`${r} (${e})`);const n=await this.getPsramCap(t),h=await this.getPsramVendor(t),_={0:null,1:"Embedded PSRAM 8MB",2:"Embedded PSRAM 2MB"}[n],E=void 0!==_?_:"Unknown Embedded PSRAM";return null!==_&&i.push(`${E} (${h})`),i}async getCrystalFreq(t){return 40}_d2h(t){const i=(+t).toString(16);return 1===i.length?"0"+i:i}async postConnect(t){const i=255&await t.readReg(this.UARTDEV_BUF_NO);t.debug("In _post_connect "+i),i==this.UARTDEV_BUF_NO_USB&&(t.ESP_RAM_BLOCK=this.USB_RAM_BLOCK)}async readMac(t){let i=await t.readReg(this.MAC_EFUSE_REG);i>>>=0;let s=await t.readReg(this.MAC_EFUSE_REG+4);s=s>>>0&65535;const e=new Uint8Array(6);return e[0]=s>>8&255,e[1]=255&s,e[2]=i>>24&255,e[3]=i>>16&255,e[4]=i>>8&255,e[5]=255&i,this._d2h(e[0])+":"+this._d2h(e[1])+":"+this._d2h(e[2])+":"+this._d2h(e[3])+":"+this._d2h(e[4])+":"+this._d2h(e[5])}getEraseSize(t,i){return i}}export{i as ESP32S3ROM};
