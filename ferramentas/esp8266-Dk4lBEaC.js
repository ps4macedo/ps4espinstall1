import{R as t}from"./rom-B2LvkjpK.js";class s extends t{constructor(){super(...arguments),this.CHIP_NAME="ESP8266",this.CHIP_DETECT_MAGIC_VALUE=[4293968129],this.EFUSE_RD_REG_BASE=1072693328,this.UART_CLKDIV_REG=1610612756,this.UART_CLKDIV_MASK=1048575,this.XTAL_CLK_DIVIDER=2,this.FLASH_WRITE_SIZE=16384,this.BOOTLOADER_FLASH_OFFSET=0,this.UART_DATE_REG_ADDR=0,this.FLASH_SIZES={"512KB":0,"256KB":16,"1MB":32,"2MB":48,"4MB":64,"2MB-c1":80,"4MB-c1":96,"8MB":128,"16MB":144},this.SPI_REG_BASE=1610613248,this.SPI_USR_OFFS=28,this.SPI_USR1_OFFS=32,this.SPI_USR2_OFFS=36,this.SPI_MOSI_DLEN_OFFS=0,this.SPI_MISO_DLEN_OFFS=0,this.SPI_W0_OFFS=64,this.getChipFeatures=async t=>{const s=["WiFi"];return"ESP8285"==await this.getChipDescription(t)&&s.push("Embedded Flash"),s}}async readEfuse(t,s){const e=this.EFUSE_RD_REG_BASE+4*s;return t.debug("Read efuse "+e),await t.readReg(e)}async getChipDescription(t){const s=await this.readEfuse(t,2);return 0!=(16&await this.readEfuse(t,0)|65536&s)?"ESP8285":"ESP8266EX"}async getCrystalFreq(t){const s=await t.readReg(this.UART_CLKDIV_REG)&this.UART_CLKDIV_MASK,e=t.transport.baudrate*s/1e6/this.XTAL_CLK_DIVIDER;let i;return i=e>33?40:26,Math.abs(i-e)>1&&t.info("WARNING: Detected crystal freq "+e+"MHz is quite different to normalized freq "+i+"MHz. Unsupported crystal in use?"),i}_d2h(t){const s=(+t).toString(16);return 1===s.length?"0"+s:s}async readMac(t){let s=await this.readEfuse(t,0);s>>>=0;let e=await this.readEfuse(t,1);e>>>=0;let i=await this.readEfuse(t,3);i>>>=0;const _=new Uint8Array(6);return 0!=i?(_[0]=i>>16&255,_[1]=i>>8&255,_[2]=255&i):0==(e>>16&255)?(_[0]=24,_[1]=254,_[2]=52):1==(e>>16&255)?(_[0]=172,_[1]=208,_[2]=116):t.error("Unknown OUI"),_[3]=e>>8&255,_[4]=255&e,_[5]=s>>24&255,this._d2h(_[0])+":"+this._d2h(_[1])+":"+this._d2h(_[2])+":"+this._d2h(_[3])+":"+this._d2h(_[4])+":"+this._d2h(_[5])}getEraseSize(t,s){return s}}export{s as ESP8266ROM};
