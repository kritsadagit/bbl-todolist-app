อ้างอิงจาก https://reactnative.dev/docs/set-up-your-environment

1. Set Up Your Environment
[1.1 macOS]
[Android]
- ติดตัั้ง Homebrew (อ้างอิงจาก https://brew.sh/)
- เปิด terminal
  ```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```
- ติดตั้ง Node
  ```bash
  brew install node
  ```
- ติดตั้ง Watchman
  ```bash
  brew install watchman
  ```
- ติดตั้ง Java Development Kit
  ```bash
  brew install --cask zulu@17
- ไปยัง folder ที่ติดตั้ง
  ```bash
  open /opt/homebrew/Caskroom/zulu@17/
- เข้าไปยัง folder และ Double click ไฟล์ <Double-Click to Install Azul Zulu JDK 17.pkg> เพื่อติดตั้ง JDK Version17
- หลังจากติดตั้ง JDK ให้ add (หากยังไม่มี) หรือ update ไฟล์ environment ใน ~/.zshrc หรือใน ~/.bash_profile เปิดไฟล์ zshrc หากใช้ zsh
  ```bash
  open ~/.zshrc
  ```
- วางบรรทัดนี้ในไฟล์ zshrc (หากใช้ zsh) เพื่อบอกระบบว่าตำแหน่งของ JDK ที่ติดตั้งแล้วอยู่ที่ไหน
  ```bash
  export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
- บันทึกและออก จากนั้นพิมพ์คำสั่งนี้เพื่อให้เสร็จสิ้นการอัปเดต ENV ของ JDK
  ```bash
  source ~/.zshrc
- ตรวจสอบว่า jdk ถูกติดตั้งเรียบร้อยจะแสดงเลข version
  ```bash
  java -version
- ดาวน์โหลดและติดตั้ง [Android Studio] https://developer.android.com/studio
  
  ในระหว่างการติดตั้ง Android Studio, จะมีหน้าต่าง Installation ที่ให้เลือกและติดตั้งส่วนประกอบต่างๆ
  
  ทำเครื่องหมายในช่อง (checkbox)
  
  Android SDK
  
  Android SDK Platform
  
  Android Virtual Device   และ คลิก Next 
- Configure ค่า ANDROID_HOME environment เปิดไฟล์ zshrc หากใช้ zsh
  ```bash
  open ~/.zshrc
  ```
วางบรรทัดเหล่านี้ในไฟล์ zshrc (หากใช้ zsh)
  ```bash
  export ANDROID_HOME=$HOME/Library/Android/sdk
  export PATH=$PATH:$ANDROID_HOME/emulator
  export PATH=$PATH:$ANDROID_HOME/platform-tools
  ```
- เปิด **VSCode** และเปิดโปรเจคต์ open -> dialer-app-main จากนั้นกดปุ่ม Open
   
- ในช่อง terminal ของ VSCode ให้ติดตั้ง node_modules ด้วยคำสั่ง
  ```bash
  npm install
- สตาร์ท server ด้วยคำสั่ง
  ```bash
  npm start
- เปิด Android Studio และเปิดโปรเจคต์ open -> dialer-app-main -> android และคลิกปุ่ม Open

จากนั้นรอ Android Studio Building สักครู่ (สังเกตจากหลอดมุมขวาล่าง) 
- เลือก Emulator ที่ต้องการเปิด (หากไม่มีให้สร้างใน Device Manager) หากมีให้แล้วกดปุ่ม Run ได้เลย
     
- เมื่อ Emulator รันแอป dialer-app-main ขึ้นมาแล้ว ให้ค้นหาเลข adb ใน terminal VSCode
  ```bash
  adb devices
(หาก adb ถูกติดตั้งแล้ว) จะแสดงข้อความ 

  ยกตัวอย่าง 
  List of devices attached 
  emulator-5554   device 
  
ให้คัดลอก 
 ```bash
 emulator-5554 
 ```
(Emulatorอาจไม่ใช่ชื่อนี้ เพียงแค่ยกตัวอย่าง)
        
- พิมพ์คำสั่ง เพื่อ reverse tcp เป็น 8081
  ```bash
  adb -s สิ่งที่คัดลอก reverse tcp:8081 tcp:8081
  ```
- จากนั้นใส่คำสั่งต่อไปนี้ เพื่อเปิด React Native Dev Menu
  ```bash
  adb shell input keyevent 82
  ```
แล้วคลิกเลือก Reload เป็นอันเสร็จสิ้น  

*** หมายเหตุ หากรันด้วย Device จริง ให้ทำคล้ายกับ Emulator โดยการ 
รันแอป DialerApp ขึ้นมาและ ค้นหาเลข adb และ reverse tcp แบบเดียวกับ Emulator
        
            
        
    -----------------------------------------------------------------------------------------------
        
    
[1.2 Windows]
- ติดตั้ง Chocolatey (อ้างอิงจาก https://chocolatey.org/install)
- เปิด powerShell ใส่คำสั่ง
  ```bash
  choco install -y nodejs-lts microsoft-openjdk17
  ```
หากมี node และ jdk17 แล้วให้ข้ามไป
- ดาวน์โหลดและติดตั้ง [Android Studio] https://developer.android.com/studio
  
ในระหว่างการติดตั้ง Android Studio, จะมีหน้าต่าง Installation ที่ให้เลือกและติดตั้งส่วนประกอบต่างๆ
  
ทำเครื่องหมายในช่อง (checkbox)
***
    Android SDK
  
    Android SDK Platform
  
    Android Virtual Device   และ คลิก Next
***

- Configure ค่า ANDROID_HOME environment

เปิด Control Panel
  
เลือก User Accounts จากนั้นเลือก User Accounts อีกครั้ง
  
เลือก Change my environment variables
  
กดปุ่ม New... และระบุ 
Variable name: 
```bash
ANDROID_HOME
```

Variable value: 
```bash
C:\Users\ชื่อuserในwindow\AppData\Local\Android\Sdk
```

- ตรวจสอบที่ตั้งของ Android SDK
  
SDK ถูกติดตั้งโดยปกติที่ 
```bash
%LOCALAPPDATA%\Android\Sdk
```
- ตรวจสอบตัวแปร ANDROID_HOME
  
เปิด PowerShell รันคำสั่งนี้เพื่อดูตัวแปรสิ่งแวดล้อมทั้งหมด
```bash
Get-ChildItem -Path Env:\
```
ตรวจสอบว่า ANDROID_HOME ถูกเพิ่มไว้ในตัวแปรสิ่งแวดล้อมหรือไม่ คำสั่งนี้จะแสดงรายการตัวแปรสิ่งแวดล้อมทั้งหมดที่มีในระบบ และจะเห็นว่า ANDROID_HOME ถูกตั้งค่าไปยังตำแหน่งของ Android SDK ที่ติดตั้งอยู่หรือไม่ 

- เพิ่ม platform-tools ลงใน Path
  

ไปที่ Control Panel -> User Accounts -> User Accounts 

คลิกที่ Change my environment variables 

ในหน้าต่าง Environment Variables, ให้เลือก Path ใน System variables หรือ User variables(ขึ้นอยู่กับว่าต้องการตั้งค่าระดับไหน) 

คลิก Edit และเลือก New เพื่อลงเพิ่ม Path ใหม่ 

เพิ่มตำแหน่งของ platform-tools ซึ่งโดยปกติจะอยู่ที่: 
```bash
%LOCALAPPDATA%\Android\Sdk\platform-tools
```
คลิก OK  

- ตรวจสอบการตั้งค่า
  
หลังจากตั้งค่าตัวแปรสิ่งแวดล้อม ANDROID_HOME และเพิ่ม platform-tools ลงใน Path แล้ว 

สามารถตรวจสอบว่าได้ทำการตั้งค่าถูกต้องหรือไม่โดยการเปิด PowerShell และรันคำสั่ง 
```bash
adb --version
```
ถ้าทุกอย่างถูกตั้งค่าเรียบร้อย, จะเห็นเวอร์ชันของ adb 

- เปิด <VSCode> และเปิดโปรเจคต์ open -> dialer-app-main จากนั้นกดปุ่ม Open
  
ในช่อง terminal ของ VSCode ให้ติดตั้ง node_modules ด้วยคำสั่ง 
```bash
npm install
```
จากนั้นให้สตาร์ท server ด้วยคำสั่ง 
```bash
npm start
```
- เปิด Android Studio และเปิดโปรเจคต์ open -> dialer-app-main -> android และคลิกปุ่ม Open

จากนั้นรอ Android Studio Building สักครู่ (สังเกตจากหลอดมุมขวาล่าง) 
- เลือก Emulator ที่ต้องการเปิด (หากไม่มีให้สร้างใน Device Manager) หากมีให้แล้วกดปุ่ม Run ได้เลย
     
- เมื่อ Emulator รันแอป DialerApp ขึ้นมาแล้ว ให้ค้นหาเลข adb ใน terminal VSCode
  ```bash
  adb devices
(หาก adb ถูกติดตั้งแล้ว) จะแสดงข้อความ 

  ยกตัวอย่าง 
  List of devices attached 
  emulator-5554   device 
  
ให้คัดลอก 
 ```bash
 emulator-5554 
 ```
(Emulatorอาจไม่ใช่ชื่อนี้ เพียงแค่ยกตัวอย่าง)
        
- พิมพ์คำสั่ง เพื่อ reverse tcp เป็น 8081
  ```bash
  adb -s สิ่งที่คัดลอก reverse tcp:8081 tcp:8081
  ```
- จากนั้นใส่คำสั่งต่อไปนี้ เพื่อเปิด React Native Dev Menu
  ```bash
  adb shell input keyevent 82
  ```
แล้วคลิกเลือก Reload เป็นอันเสร็จสิ้น  

*** หมายเหตุ หากรันด้วย Device จริง ให้ทำคล้ายกับ Emulator โดยการ 
รันแอป DialerApp ขึ้นมาและ ค้นหาเลข adb และ reverse tcp แบบเดียวกับ Emulator 


  

หากติดปัญหาติดต่อได้ที่ kritsada.buain@hotmail.com
